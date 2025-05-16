// backend/middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { expressCspHeader } = require('express-csp-header');

const securityMiddleware = (app) => {
  // Configuración avanzada de Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-eval'"], // Ajustar según necesidades
        "connect-src": ["'self'", "https://api.blockchain.com"],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
  }));

  // Rate Limiting estratificado
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip + req.get('User-Agent'),
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests',
        nextValidRequest: new Date(Date.now() + 15*60000).toISOString()
      });
    }
  });

  app.use('/api/', apiLimiter);
  
  // Headers de seguridad personalizados
  app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Permissions-Policy', 'geolocation=(), microphone=()');
    next();
  });
};

module.exports = securityMiddleware;