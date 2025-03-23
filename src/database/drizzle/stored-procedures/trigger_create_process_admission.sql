-- Primero, crea la función que será llamada por el trigger
CREATE OR REPLACE FUNCTION trigger_create_process_admission()
RETURNS TRIGGER AS $$
DECLARE
  r RECORD;
BEGIN
  -- Marcar los demás procesos como no actuales
  UPDATE admission_processes SET is_current = false WHERE id <> NEW.id;

  -- Crear el nuevo esquema
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', NEW.name);

  -- Copiar las estructuras de core_schema al nuevo esquema
  FOR r IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'core_schema'
  LOOP
    EXECUTE format(
      'CREATE TABLE %I.%I (LIKE core_schema.%I INCLUDING ALL)',
      NEW.name, r.tablename, r.tablename
    );
  END LOOP;

  -- Eliminar la tabla _prisma_migrations del nuevo esquema si existe
  EXECUTE format('DROP TABLE IF EXISTS %I._prisma_migrations', NEW.name);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Luego, crea el trigger que llama a esta función
CREATE OR REPLACE TRIGGER after_insert_admission_process
AFTER INSERT ON admission_processes
FOR EACH ROW
EXECUTE FUNCTION trigger_create_process_admission();