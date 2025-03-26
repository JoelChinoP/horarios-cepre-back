# Usa Node.js 18 como imagen base
FROM node:22

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json yarn.lock ./

# Instala dependencias sin guardar en cache
RUN yarn install --frozen-lockfile

# Copia el resto del código del proyecto
COPY . .

# Construye la aplicación
RUN yarn build

# Expone el puerto en el que correrá la aplicación
EXPOSE 8080

# Comando para correr la aplicación en Cloud Run
CMD ["node", "dist/main.js"]
