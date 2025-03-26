# Usa la imagen oficial de Node.js 22
FROM node:22

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json antes de instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias (incluyendo NestJS localmente)
RUN npm install --omit=dev

# Copia todo el código fuente
COPY . .

# Asegura que Nest CLI esté disponible (si es necesario)
RUN npm install -g @nestjs/cli

# Construye el proyecto
RUN npm run build

# Expone el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
