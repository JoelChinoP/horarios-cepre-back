# Usa una imagen base de Node.js
FROM node:18-alpine

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos y dependencias
COPY package.json package-lock.json ./
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto (ajústalo según la app)
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main.js"]
