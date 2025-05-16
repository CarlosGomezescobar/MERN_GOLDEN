FROM node:20.19.1-alpine3.19 AS builder

LABEL maintainer="Carlos Gomez DevSecOps <gg.20twenty1@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/CarlosGomezescobar/golden "

# Configuración de usuario no-root
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --shell /bin/bash appuser

WORKDIR /home/appuser/app

# Copiar dependencias por separado para aprovechar el caché
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --only=prod

# Copiar código fuente
COPY --chown=appuser:appgroup . .

# Construcción de la aplicación
ENV NODE_ENV=production
RUN npm run build

# Fase 2: Imagen de producción ultra-segura
# Usamos una imagen distroless para minimizar la superficie de ataque
FROM gcr.io/distroless/nodejs20-debian12

# Configuración de usuario no-root
USER nonroot:nonroot

# Configuración de permisos seguros
WORKDIR /home/nonroot/app

# Copiar archivos construidos y dependencias
COPY --from=builder --chown=nonroot:nonroot /home/appuser/app /home/nonroot/app

# Configuración de seguridad adicional
RUN mkdir -p /tmp && \
    chmod 700 /tmp

# Exposición de puertos seguros
EXPOSE 3000

# Configuración de salud del contenedor
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Configuración de arranque seguro
CMD ["server.js"]