# Usa Node.js 22 como base
FROM node:22

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo archivos de dependencias primero (para optimizar caché de Docker)
COPY package.json package-lock.json ./

# Instala todas las dependencias, incluyendo devDependencies (necesarios para Prisma y Drizzle)
RUN npm install

# Copia todo el código fuente
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Si usas Drizzle, asegúrate de que esté instalado
RUN npm install drizzle-kit

# Compila el código de NestJS
RUN npm run build

# Expone el puerto 8080
EXPOSE 8080

# Ejecuta la aplicación
CMD ["node", "dist/main.js"]
