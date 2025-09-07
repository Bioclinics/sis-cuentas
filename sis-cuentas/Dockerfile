# Etapa de build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copiamos dependencias
COPY package*.json ./

# Instalamos solo devDependencies para poder compilar
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos el proyecto
RUN npm run build

# Etapa de producción
FROM node:22-alpine

WORKDIR /usr/src/app

# Copiamos solo lo necesario desde el build
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

# Exponemos puerto interno 3000
EXPOSE 3000

CMD ["node", "dist/main.js"]
