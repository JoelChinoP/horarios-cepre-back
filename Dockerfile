# Usa una imagen de Node.js como base
FROM node:18 AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia archivos necesarios antes de instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias sin incluir devDependencies para producción
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la aplicación (asegúrate de que `tsconfig.json` esté bien configurado)
RUN npm run build

# Usa una imagen más ligera para producción
FROM node:22 AS runtime

WORKDIR /app

# Copia los archivos compilados desde la etapa "build"
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

# Establece variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Expone el puerto 8080 para Cloud Run
EXPOSE 8080

# Ejecuta la aplicación
CMD ["node", "dist/main.js"]
