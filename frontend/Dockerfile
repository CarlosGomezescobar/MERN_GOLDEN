# Fase 1: Construcción de la aplicación
FROM node:20.19.1-alpine3.19 AS builder

LABEL maintainer="Carlos Gomez DevSecOps <gg.20twenty1@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/CarlosGomezescobar/MERN_GOLDEN "

# Configuración de usuario no-root
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --shell /bin/bash appuser

WORKDIR /home/appuser/app

# Copiar dependencias por separado para aprovechar el caché
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --only=prod

# Copiar código fuente
COPY --chown=appuser:appgroup . .

# Construcción del frontend
ENV NODE_ENV=production
RUN npm run build

# Fase 2: Imagen final ultra-segura
FROM gcr.io/distroless/nginx-debian12

# Copiar archivos construidos
COPY --from=builder /home/appuser/app/build /usr/share/nginx/html

# Copiar configuraciones seguras personalizadas
COPY --from=builder /home/appuser/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/appuser/app/security.conf /etc/nginx/conf.d/security.conf

# Exposición de puertos seguros
EXPOSE 80

# Health check seguro
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD wget -O - http://localhost:80/health | grep -q '"status":"ok"'

# Inicio del servidor con configuración segura
CMD ["nginx", "-g", "daemon off;"]