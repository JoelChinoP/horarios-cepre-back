import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

dotenv.config();

const runMigrations = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    // Generar migraciones con Drizzle Kit
    console.log('\nApplying migrations...');
    execSync('npx drizzle-kit generate');
    console.log('Migrations applied successfully.');

    // Ejecutar el archivo SQL después de la primera migración
    const sqlFilePath = join(
      __dirname,
      'stored-procedures/trigger_create_process_admission.sql', // Ruta al archivo SQL
    );
    if (existsSync(sqlFilePath)) {
      const sql = readFileSync(sqlFilePath, 'utf8');
      await client.query(sql);
      console.log('\nStored procedures executed successfully.');
    } else {
      console.error('Error: No se encontró el archivo SQL en', sqlFilePath);
    }
  } catch (err) {
    console.error('Error during migration:', err);
  } finally {
    await client.end();
  }
};

runMigrations().catch((err) => {
  console.error('Unhandled error in runMigrations:', err);
});
