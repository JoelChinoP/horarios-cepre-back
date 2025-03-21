import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const MIGRATIONS_DIR = path.resolve(__dirname, '/migrations');

const isInitialMigration = (): boolean => {
  try {
    if (!fs.existsSync(MIGRATIONS_DIR)) {
      return true;
    }

    const contents = fs.readdirSync(MIGRATIONS_DIR, { withFileTypes: true });
    const folders = contents.filter((entry) => entry.isDirectory());

    return folders.length === 0;
  } catch (error) {
    console.error('Error al verificar las migraciones existentes:', error);
    return true; // Por seguridad, tratamos como inicial
  }
};

const runMigrations = () => {
  const schemaName = process.env.DEFAULT_SCHEMA;
  const dbUrl = `${process.env.DATABASE_URL}&schema=${schemaName}`;
  process.env.DATABASE_URL = dbUrl;

  console.log('🧬 Generando Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  if (isInitialMigration()) {
    console.log('🚀 Aplicando migración inicial...');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  } else {
    console.log('📦 Ejecutando migraciones existentes (deploy)...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  }

  console.log('\n✅ Migración ejecutada correctamente.');
};

try {
  runMigrations();
} catch (err) {
  console.error('❌ Error al ejecutar la migración:', err);
}
