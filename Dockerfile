# Usa Node.js 22 como imagen base
FROM node:22

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios antes de instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias con npm
RUN npm install --omit=dev

# Copia el resto del código del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 8080

# Comando para correr la aplicación en Cloud Run
CMD ["node", "dist/main.js"]
