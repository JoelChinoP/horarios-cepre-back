# Etapa 1: Construcción de la aplicación
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npm run build

# Etapa 2: Ejecución
FROM node:20

WORKDIR /app

COPY --from=builder /app ./

CMD ["node", "dist/main.js"]
