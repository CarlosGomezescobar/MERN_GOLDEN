# MERN_GOLDEN - Plataforma Inmobiliaria Blockchain  
![Build Status](https://github.com/CarlosGomezescobar/MERN_GOLDEN/actions/workflows/ci-cd.yml/badge.svg )  
![Security Rating](https://snyk.io/test/github/CarlosGomezescobar/MERN_GOLDEN/badge.svg )  
![License](https://img.shields.io/badge/license-MIT-green )

## Descripción del Proyecto  
Plataforma inmobiliaria descentralizada que combina:  
- **Backend Centralizado**: Node.js + Express + MongoDB con autenticación JWT y seguridad DevSecOps  
- **Frontend 3D**: React + Three.js con visualización inmersiva de propiedades  
- **Blockchain Integration**: Contratos inteligentes en Solidity para transacciones seguras  
- **Infraestructura Segura**: Docker multi-etapa, imágenes distroless y pipelines CI/CD con análisis de vulnerabilidades  

---

## Tabla de Contenidos  
1. [Requisitos](#requisitos)  
2. [Instalación](#instalación)  
3. [Seguridad](#seguridad)  
4. [Despliegue](#despliegue)  
5. [Monitoreo](#monitoreo)  
6. [Contribución](#contribución)  
7. [Licencia](#licencia)  

---

## Requisitos  
| Componente | Versión |  
|------------|---------|  
| Node.js    | 20.x    |  
| Docker     | 26.x+   |  
| MongoDB    | 7.x     |  
| Solidity   | 0.8.24  |  

**Variables de Entorno** (copiar `.env.example`):  
```bash
# Backend
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/goldencity  
JWT_SECRET=supersecretkey  
PORT=5000  

# Frontend
REACT_APP_API_URL=http://localhost:5000  
REACT_APP_BLOCKCHAIN_NETWORK=polygon_mumbai  

Estructura Propuesta del Proyecto

MERN_GOLDEN/
├── backend/                # Backend centralizado (Express + MongoDB)
│   ├── config/             # Configuración (DB, autenticación, seguridad)
│   │   └── database.js     # Conexión a MongoDB con Mongoose
│   ├── controllers/        # Lógica de negocio (ej: healthController.js)
│   ├── middleware/         # Middlewares de seguridad (auth, logging, rate-limiting)
│   ├── models/             # Modelos de datos (Mongoose)
│   ├── routes/             # Rutas API (ej: healthRoute.js)
│   ├── utils/              # Funciones auxiliares (validaciones, hashing)
│   ├── Dockerfile          # Dockerfile multi-etapa con imagen distroless
│   ├── app.js              # Configuración principal de Express
│   ├── server.js           # Inicialización del servidor
│   └── package.json        # Dependencias y scripts
│
├── frontend/               # Frontend React + Three.js
│   ├── public/             # Archivos estáticos (favicon, manifest)
│   ├── src/                # Código fuente
│   │   ├── components/     # Componentes reutilizables (ej: PropertyViewer.jsx)
│   │   ├── hooks/          # Hooks personalizados (ej: useBlockchain.ts)
│   │   ├── pages/          # Páginas (Home, Dashboard, etc.)
│   │   ├── context/        # State management con Context API o Jotai
│   │   ├── services/       # API clients y conexión con contratos inteligentes
│   │   ├── assets/         # Imágenes, íconos, modelos 3D
│   │   ├── styles/         # Estilos globales (Tailwind + CSS Modules)
│   │   ├── App.tsx         # Componente raíz
│   │   ├── index.tsx       # Punto de entrada
│   │   └── react-app-env.d.ts # Tipos globales
│   ├── Dockerfile          # Imagen NGINX con seguridad reforzada
│   └── package.json        # Dependencias y scripts
│
├── contracts/              # Contratos inteligentes (Solidity)
│   ├── artifacts/          # ABIs generados por Hardhat
│   ├── scripts/            # Scripts de despliegue (ej: deploy.js)
│   ├── test/               # Pruebas unitarias (Waffle/Mocha)
│   ├── hardhat.config.js   # Configuración de Hardhat
│   ├── Dockerfile          # Entorno de desarrollo con Hardhat
│   └── README.md           # Guía de despliegue y seguridad
│
├── libs/                   # Librerías compartidas
│   ├── abis/               # ABIs de contratos (generados automáticamente)
│   ├── constants/          # Direcciones de contratos y URLs
│   ├── helpers/            # Funciones para interactuar con la blockchain
│   └── types/              # Tipos TypeScript para contratos y servicios
│
├── devops/                 # DevSecOps Integrado
│   ├── threat-modeling/    # Modelos de amenazas (ej: STRIDE)
│   ├── security/
│   │   ├── sast/           # Configuración ESLint/Slither para SAST
│   │   ├── dast/           # OWASP ZAP para pruebas dinámicas
│   │   ├── sca/            # Snyk + Trivy para análisis de dependencias
│   │   └── compliance/     # Políticas GDPR/PCI-DSS (Open Policy Agent)
│   ├── chaos-engineering/  # Experimentos con Chaos Monkey
│   ├── secrets-management/ # Integración con AWS Secrets Manager
│   ├── incident-response/  # Playbooks para incidentes de seguridad
│   ├── cost-optimization/  # Scripts de monitorización de costos (CloudHealth)
│   └── drift-detection/    # Detección de desviaciones (Driftctl)
│   └── infrastructure/
│   │   ├── terraform/main.tf
│   └── monitoring
│   │   ├── prometheus/prometheus.yml
│
├── docs/                   # Documentación
│   ├── architecture/       # Diagramas C4 y de flujo de datos
│   ├── api-docs/           # Documentación OpenAPI/Swagger
│   ├── smart-contracts/    # Especificaciones técnicas de contratos
│   └── user-manual/        # Guía de usuario
│
├── tests/                  # Pruebas automatizadas
│   ├── integration/        # Pruebas de integración (Supertest/Jest)
│   ├── e2e/                # Pruebas end-to-end (Cypress)
│   └── unit/               # Pruebas unitarias (Jest/Mocha)
│
├── .github/                # GitHub Actions
│   └── workflows/          # Pipelines CI/CD con seguridad integrada
│
├── .husky/                 # Git hooks para pre-commit (lint-staged)
├── .env.example            # Plantilla de variables de entorno
├── .gitignore              # Archivos ignorados
├── docker-compose.yml      # Orquestación de servicios (MongoDB, Nginx)
├── package.json            # Dependencias globales (concurrently, etc.)
└── README.md               # Documentación principal

##Graph 
graph TD
    A[Frontend] -->|HTTPS Mutual TLS| B[API Gateway]
    B --> C[Auth Service]
    B --> D[Blockchain Proxy]
    C -->|JWT Validation| E[Backend Services]
    D -->|gRPC| F[Smart Contracts]
    E --> G[Database]
    E --> H[External APIs]
    F --> I[Blockchain Nodes]
    
    style A fill:#4CAF50,stroke:#388E3C
    style B fill:#2196F3,stroke:#1976D2
    style C fill:#FF9800,stroke:#F57C00
    style D fill:#9C27B0,stroke:#7B1FA2
    style E fill:#607D8B,stroke:#455A64
    style F fill:#E91E63,stroke:#C2185B

# Clonar repositorio
git clone https://github.com/CarlosGomezescobar/MERN_GOLDEN.git   
cd MERN_GOLDEN  

# Instalar dependencias
`npm install --prefix backend`
npm install --prefix frontend  

# Iniciar servicios
npm run start  

# Construir imágenes con Snyk scanning
docker-compose -f docker-compose.dev.yml build  
docker-compose up -d  

# Escanear vulnerabilidades
trivy image backend:latest  
snyk container test frontend:latest --severity-threshold=high  