# Usa una imagen base de Node.js
FROM node:22 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias en modo producción
RUN npm install --only=production

# Copia el resto del código de la aplicación
COPY . .

# Establece la variable de entorno para producción
ENV NODE_ENV=production

# Cloud Run espera que la aplicación escuche en el puerto 8080
ENV PORT=8080

# Expone el puerto correcto
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
