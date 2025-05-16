FROM node:20.19.1-alpine3.19 AS builder

# Etiquetas de metadatos para trazabilidad y seguridad
LABEL maintainer="Carlos Gomez DevSecOps <gg.20twenty1@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/CarlosGomezescobar/MERN_GOLDEN "

# Configuración de usuario no-root
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --shell /bin/bash appuser

WORKDIR /home/appuser/app/frontend

# Copiar dependencias por separado para aprovechar el caché
COPY --chown=appuser:appgroup frontend/package*.json ./
RUN npm ci --only=prod

# Copiar código fuente del frontend
COPY --chown=appuser:appgroup frontend/ .

# Construcción del frontend
ENV NODE_ENV=production
RUN npm run build

FROM node:20.19.1-alpine3.19

# Crear usuario no-root
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --shell /bin/bash appuser

WORKDIR /home/appuser/app/backend

# Copiar dependencias del backend
COPY --chown=appuser:appgroup backend/package*.json ./
RUN npm ci --only=prod

# Copiar código fuente del backend
COPY --chown=appuser:appgroup backend/ .

# Copiar archivos build del frontend
COPY --from=frontend-builder /home/appuser/app/frontend/build ./public

# Fase 3: Imagen final ultra-segura
FROM gcr.io/distroless/nodejs20-debian12

# Configuración de usuario no-root
USER nonroot:nonroot

# Directorio de trabajo seguro
WORKDIR /home/nonroot/app

# Copiar backend y archivos build del frontend
COPY --from=backend-builder /home/appuser/app/backend /home/nonroot/app

# Configurar permisos seguros
RUN mkdir -p /tmp && \
    chmod 700 /tmp

# Exposición de puertos seguros
EXPOSE 5000

# Health check seguro
HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD wget --no-check-certificate -O - http://localhost:5000/api/health 2>/dev/null | grep -q '"status":"ok"'

# Comando de inicio seguro
CMD ["server.js"]