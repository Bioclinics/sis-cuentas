# ============================
# Etapa de build
# ============================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copiar solo package.json y package-lock.json primero para aprovechar la cache
COPY package*.json ./

RUN npm install

# Copiar todo el código y compilar
COPY . .

RUN npm run build

# ============================
# Etapa de producción
# ============================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copiar solo las dependencias necesarias
COPY package*.json ./

RUN npm install --omit=dev

# Copiar el resultado del build desde la etapa anterior
COPY --from=builder /usr/src/app/dist ./dist

# Exponer el puerto configurado en Nest (por defecto 3000)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/main.js"]
