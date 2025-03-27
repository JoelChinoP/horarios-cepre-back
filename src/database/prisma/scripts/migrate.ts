import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import path from 'path';

// Carga las variables del .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Lee la variable CORE_SCHEMA
const schema = process.env.CORE_SCHEMA;
if (!schema) {
  throw new Error('❌ CORE_SCHEMA no está definida en .env');
}

// Guarda la URL original de la base de datos
const originalDbUrl = process.env.DATABASE_URL;
if (!originalDbUrl) {
  throw new Error('❌ DATABASE_URL no está definida en .env');
}

// Crea una nueva URL con el esquema deseado
const dbUrlWithSchema = `${originalDbUrl.split('?')[0]}?schema=${schema}`;
process.env.DATABASE_URL = dbUrlWithSchema;

const commandMigrate = `npx prisma migrate dev --name init-${schema}`;

try {
  console.log(`🛠️  Ejecutando migración en el esquema: ${schema}`);
  execSync(commandMigrate, { stdio: 'inherit' });
  console.log('✅ Migración aplicada correctamente.');
} catch (error) {
  console.error('❌ Error al ejecutar la migración:', error);
} finally {
  // Restaura la variable original
  process.env.DATABASE_URL = originalDbUrl;
  console.log('🔄 DATABASE_URL restaurada a su valor original.');
}
