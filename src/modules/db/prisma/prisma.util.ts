import { PrismaClient } from '@prisma/client';

const clientCache = new Map<string, PrismaClient>();

export function getPrismaClient(schema: string): PrismaClient {
  if (clientCache.has(schema)) return clientCache.get(schema)!;

  const client = new PrismaClient({
    datasources: {
      db: {
        // Importante: usa `schema` como parte de la conexión
        url: `${process.env.DATABASE_URL}?schema=${schema}`,
      },
    },
  });

  clientCache.set(schema, client);
  return client;
}
