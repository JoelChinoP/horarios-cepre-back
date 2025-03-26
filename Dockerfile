# Usa Node.js como imagen base
FROM node:22 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json antes de instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el código fuente
COPY . .

# **Genera los archivos de Prisma**
RUN npx prisma generate

# Si usas migraciones en producción, aplica los cambios
RUN npx prisma migrate deploy

# **Compila la aplicación**
RUN npm run build

# Segunda etapa: imagen ligera para producción
FROM node:18 AS runtime

WORKDIR /app

# Copia solo lo necesario para producción
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

# Define variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Expone el puerto 8080 para Cloud Run
EXPOSE 8080

# Ejecuta la aplicación
CMD ["node", "./dist/main.js"]

