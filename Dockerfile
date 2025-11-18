# --- Etapa de build ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar APENAS package.json e package-lock.json primeiro
COPY package.json package-lock.json ./

# Instalar dependências do backend
RUN npm ci

# Copiar tudo
COPY . .

# Build do projeto inteiro (client + server)
RUN npm run build

# --- Etapa final (imagem de produção) ---
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copiar pacotes e lockfile
COPY package.json package-lock.json ./

# Instalar dependências só de produção
RUN npm ci --only=production

# Copiar build gerado
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/project_source/build ./project_source/build

EXPOSE 3000

CMD ["node", "dist/server.js"]
