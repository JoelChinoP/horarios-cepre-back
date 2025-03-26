# Usa una imagen base de Node.js
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias en modo producción
RUN npm install --only=production

# Copia el resto del código de la aplicación
COPY . .

# Establece la variable de entorno de producción
ENV NODE_ENV=production

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["node", "dist/main.js"]
