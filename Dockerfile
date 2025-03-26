# Usa Node.js 22 como base
FROM node:22

# Establece el directorio de trabajo en la raíz (ya que dist está allí)
WORKDIR /

# Copia solo archivos de dependencias primero (para optimizar caché de Docker)
COPY package.json package-lock.json ./

# Instala dependencias con npm ci (más rápido y fiable que npm install)
RUN npm ci

# Copia todo el código fuente, incluyendo la carpeta dist
COPY . .

# Expone el puerto 8080 para Cloud Run
EXPOSE 8080

# Ejecuta la aplicación desde la raíz
CMD ["node", "dist/main.js"]
