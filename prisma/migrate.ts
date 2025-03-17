import { execSync } from 'child_process';
//import { SchemaDefaultStore } from '@database/prisma/schema-default.store';

import * as dotenv from 'dotenv';
import path from 'path';

// Carga las variables del .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Lee la variable DEFAULT_SCHEMA
const schema = process.env.DEFAULT_SCHEMA;

if (!schema) {
  throw new Error('❌ DEFAULT_SCHEMA no está definida en .env');
}

// Crea una copia de DATABASE_URL pero con el schema deseado
//const originalDbUrl = process.env.DATABASE_URL;
const dbUrlWithSchema = `${process.env.DATABASE_URL}&schema=${schema}`; //originalDbUrl?.replace(
//  /schema=\w+/,
//  `schema=${schema}`,
//);

if (!dbUrlWithSchema) {
  throw new Error('❌ DATABASE_URL no está definida en .env');
}

// Prisma usa DATABASE_URL, así que la inyectamos temporalmente
process.env.DATABASE_URL = dbUrlWithSchema;

const commandMigrate = `npx prisma migrate dev --name init-${schema}`;

try {
  console.log(`🛠️  Ejecutando migración en el esquema: ${schema}`);
  execSync(commandMigrate, { stdio: 'inherit' });
  console.log('✅ Migración aplicada correctamente.');
} catch (error) {
  console.error('❌ Error al ejecutar la migración:', error);
}
