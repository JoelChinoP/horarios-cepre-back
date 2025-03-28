-- Función para copiar un esquema completo
CREATE OR REPLACE FUNCTION copy_schema_structure(
    source_schema TEXT, 
    target_schema TEXT
) RETURNS VOID AS $$
DECLARE 
    r RECORD;
BEGIN
    -- Crear el nuevo esquema si no existe
    EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', target_schema);

    -- Copiar ENUMS
    FOR r IN 
        SELECT 
            pg_type.typname AS enum_name, 
            array_agg(pg_enum.enumlabel ORDER BY pg_enum.enumsortorder) AS enum_values
        FROM 
            pg_type 
        JOIN 
            pg_enum ON pg_enum.enumtypid = pg_type.oid 
        JOIN 
            pg_namespace ON pg_namespace.oid = pg_type.typnamespace
        WHERE 
            pg_namespace.nspname = source_schema
        GROUP BY 
            pg_type.typname
    LOOP
        EXECUTE format(
            'CREATE TYPE %I.%I AS ENUM (%L)', 
            target_schema, 
            r.enum_name, 
            r.enum_values
        );
    END LOOP;

    -- Copiar TABLAS (incluyendo restricciones, índices, etc.)
    FOR r IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = source_schema 
        AND tablename != '_prisma_migrations'
    LOOP
        EXECUTE format(
            'CREATE TABLE %I.%I (LIKE %I.%I INCLUDING ALL)', 
            target_schema, 
            r.tablename, 
            source_schema, 
            r.tablename
        );
    END LOOP;

    -- Copiar VISTAS
    FOR r IN 
        SELECT viewname 
        FROM pg_views 
        WHERE schemaname = source_schema
    LOOP
        EXECUTE format(
            'CREATE OR REPLACE VIEW %I.%I AS %s', 
            target_schema, 
            r.viewname, 
            (
                SELECT definition 
                FROM pg_views 
                WHERE schemaname = source_schema 
                AND viewname = r.viewname
            )
        );
    END LOOP;

    -- Copiar VISTAS MATERIALIZADAS
    FOR r IN 
        SELECT matviewname 
        FROM pg_matviews 
        WHERE schemaname = source_schema
    LOOP
        EXECUTE format(
            'CREATE MATERIALIZED VIEW %I.%I AS %s', 
            target_schema, 
            r.matviewname, 
            (
                SELECT definition 
                FROM pg_matviews 
                WHERE schemaname = source_schema 
                AND matviewname = r.matviewname
            )
        );
    END LOOP;

    -- Copiar SECUENCIAS
    FOR r IN 
        SELECT sequencename 
        FROM pg_sequences 
        WHERE schemaname = source_schema
    LOOP
        EXECUTE format(
            'CREATE SEQUENCE %I.%I AS bigint', 
            target_schema, 
            r.sequencename
        );
    END LOOP;

    -- Copiar FUNCIONES
    FOR r IN 
        SELECT 
            p.proname AS function_name, 
            pg_get_functiondef(p.oid) AS function_definition
        FROM 
            pg_proc p
        JOIN 
            pg_namespace n ON n.oid = p.pronamespace
        WHERE 
            n.nspname = source_schema
    LOOP
        BEGIN
            EXECUTE format(
                'CREATE OR REPLACE %s IN %I', 
                replace(r.function_definition, 'CREATE FUNCTION', 'FUNCTION'),
                target_schema
            );
        EXCEPTION WHEN OTHERS THEN
            -- Opcional: Log o manejar errores de funciones específicas
            RAISE NOTICE 'Could not copy function %: %', r.function_name, SQLERRM;
        END;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Modificación del trigger para usar la nueva función
CREATE OR REPLACE FUNCTION trigger_create_process_admission() 
RETURNS TRIGGER AS $$
BEGIN 
    -- Marcar los demás procesos como no actuales
    UPDATE admission_processes SET is_current = false WHERE id <> NEW.id;
    
    -- Copiar la estructura completa del esquema
    PERFORM copy_schema_structure('core_schema', NEW.name);
    
    RETURN NEW; 
END; 
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE OR REPLACE TRIGGER after_insert_admission_process 
AFTER INSERT ON admission_processes 
FOR EACH ROW 
EXECUTE FUNCTION trigger_create_process_admission();