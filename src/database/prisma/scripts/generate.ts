import { execSync } from 'child_process';

try {
  execSync('npx prisma generate --schema src/database/prisma/schema.prisma', {
    stdio: 'inherit',
  });
  console.log('\n✅ Terminado...');
} catch (error) {
  console.error('❌ Error al ejecutar la migración:', error);
}
