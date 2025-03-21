-- Crear Procedimiento almacenado para crear un nuevo proceso de admisión
CREATE OR REPLACE FUNCTION create_process_admission(
  p_name TEXT,
  p_year TEXT,
  p_description TEXT
) RETURNS INT AS $$
DECLARE
  new_id INT;
  r RECORD;
BEGIN
  -- Insertar el nuevo proceso
  INSERT INTO admission_processes(name, year, description, is_current)
  VALUES (p_name, p_year, p_description, true)
  RETURNING id INTO new_id;

  -- Marcar los demás como no actuales
  UPDATE admission_processes SET is_current = false WHERE id <> new_id;

  -- Crear el nuevo esquema
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', p_name);

  -- Copiar las estructuras de core_schema al nuevo esquema
  FOR r IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'core_schema'
  LOOP
    EXECUTE format(
      'CREATE TABLE %I.%I (LIKE core_schema.%I INCLUDING ALL)',
      p_name, r.tablename, r.tablename
    );
  END LOOP;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql;