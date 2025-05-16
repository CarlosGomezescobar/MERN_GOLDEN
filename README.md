# MERN_GOLDEN - Blockchain "DAPP" Platform 
![Build Status](https://github.com/CarlosGomezescobar/MERN_GOLDEN/actions/workflows/ci-cd.yml/badge.svg )  
![Security Rating](https://snyk.io/test/github/CarlosGomezescobar/MERN_GOLDEN/badge.svg )  
![License](https://img.shields.io/badge/license-MIT-green )

## Project Description  
Decentralized Web3 platform combining:  
- **Centralized Backend**: Node.js + Express + MongoDB with JWT authentication and DevSecOps security 
- **3D Frontend**: React + Three.js with immersive property visualization  
- **Blockchain Integration**: Solidity smart contracts for secure transactions 
- **Secure Infrastructure**: Multi-stage Docker, distroless images, and vulnerability-scanned CI/CD pipelines

---

## Table of Contents 
1. [Requirements](#requirements)  
2. [Installation](#installation)  
3. [Security](#security)  
4. [Deployment](#deployment)  
5. [Monitoring](#monitoring)  
6. [Contribution](#contribution)  
7. [License](#license)  

---

## Requirements  
| Component  | Version |  
|------------|---------|  
| Node.js    | 20.x    |  
| Docker     | 26.x+   |  
| MongoDB    | 7.x     |  
| Solidity   | 0.8.24  | 


**Environment Variables** (copiar `.env.example`):  
```bash
# Backend
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/goldencity  
JWT_SECRET=supersecretkey  
PORT=5000  

# Frontend
REACT_APP_API_URL=http://localhost:5000  
REACT_APP_BLOCKCHAIN_NETWORK=polygon_mumbai  

# Clone repository
git clone https://github.com/CarlosGomezescobar/MERN_GOLDEN.git  
cd MERN_GOLDEN  

# Install dependencies
npm install --prefix backend
npm install --prefix frontend  

# Start services
npm run start  

# Build images with Snyk scanning
docker-compose -f docker-compose.dev.yml build  
docker-compose up -d  

# Vulnerability scanning
trivy image backend:latest  
snyk container test frontend:latest --severity-threshold=high  

## Project Structure

MERN_GOLDEN/
├── backend/                # Centralized Backend (Express + MongoDB)
│   ├── config/             # Configuration (DB, auth, security)
│   │   └── database.js     # MongoDB connection with Mongoose
│   ├── controllers/        # Business logic (e.g., healthController.js)
│   ├── middleware/         # Security middlewares (auth, logging, rate-limiting)
│   ├── models/             # Data models (Mongoose)
│   ├── routes/             # API routes (e.g., healthRoute.js)
│   ├── utils/              # Helper functions (validations, hashing)
│   ├── Dockerfile          # Multi-stage Dockerfile with distroless image
│   ├── app.js              # Express main configuration
│   ├── server.js           # Server initialization
│   └── package.json        # Dependencies and scripts
│
├── frontend/               # React + Three.js Frontend
│   ├── public/             # Static files (favicon, manifest)
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components (e.g., PropertyViewer.jsx)
│   │   ├── hooks/          # Custom hooks (e.g., useBlockchain.ts)
│   │   ├── pages/          # Pages (Home, Dashboard, etc.)
│   │   ├── context/        # State management (Context API or Jotai)
│   │   ├── services/       # API clients and smart contract connections
│   │   ├── assets/         # Images, icons, 3D models
│   │   ├── styles/         # Global styles (Tailwind + CSS Modules)
│   │   ├── App.tsx         # Root component
│   │   ├── index.tsx       # Entry point
│   │   └── react-app-env.d.ts # Global types
│   ├── Dockerfile          # NGINX image with hardened security
│   └── package.json        # Dependencies and scripts
│
├── contracts/              # Smart Contracts (Solidity)
│   ├── artifacts/          # Hardhat-generated ABIs
│   ├── scripts/            # Deployment scripts (e.g., deploy.js)
│   ├── test/               # Unit tests (Waffle/Mocha)
│   ├── hardhat.config.js   # Hardhat configuration
│   ├── Dockerfile          # Hardhat development environment
│   └── README.md           # Deployment and security guide
│
├── libs/                   # Shared libraries
│   ├── abis/               # Contract ABIs (auto-generated)
│   ├── constants/          # Contract addresses and URLs
│   ├── helpers/            # Blockchain interaction functions
│   └── types/              # TypeScript types for contracts and services
│
├── devops/                 # Integrated DevSecOps
│   ├── threat-modeling/    # Threat models (e.g., STRIDE)
│   ├── security/
│   │   ├── sast/           # ESLint/Slither SAST configuration
│   │   ├── dast/           # OWASP ZAP for dynamic testing
│   │   ├── sca/            # Snyk + Trivy dependency analysis
│   │   └── compliance/     # GDPR/PCI-DSS policies (Open Policy Agent)
│   ├── chaos-engineering/  # Chaos Monkey experiments
│   ├── secrets-management/ # AWS Secrets Manager integration
│   ├── incident-response/  # Security incident playbooks
│   ├── cost-optimization/  # Cloud cost monitoring scripts (CloudHealth)
│   └── drift-detection/    # Configuration drift detection (Driftctl)
│   └── infrastructure/
│   │   ├── terraform/main.tf
│   └── monitoring
│   │   ├── prometheus/prometheus.yml
│
├── docs/                   # Documentation
│   ├── architecture/       # C4 and data flow diagrams
│   ├── api-docs/           # OpenAPI/Swagger documentation
│   ├── smart-contracts/    # Technical contract specifications
│   └── user-manual/        # User guide
│
├── tests/                  # Automated tests
│   ├── integration/        # Integration tests (Supertest/Jest)
│   ├── e2e/                # End-to-end tests (Cypress)
│   └── unit/               # Unit tests (Jest/Mocha)
│
├── .github/                # GitHub Actions
│   └── workflows/          # CI/CD pipelines with integrated security
│
├── .husky/                 # Git hooks for pre-commit (lint-staged)
├── .env.example            # Environment variables template
├── .gitignore              # Ignored files
├── docker-compose.yml      # Service orchestration (MongoDB, Nginx)
├── package.json            # Global dependencies (concurrently, etc.)
└── README.md               # Main documentation