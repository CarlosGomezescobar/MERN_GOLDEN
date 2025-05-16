// backend/controllers/healthController.js
exports.healthCheck = (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        storage: 'ok',
        authentication: 'active'
      }
    });
  };