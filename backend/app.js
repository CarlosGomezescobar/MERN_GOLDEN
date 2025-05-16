// backend/app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const healthRoute = require('./routes/healthRoute');

const connectDatabase = require('./config/database');

dotenv.config();

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API Running' });
});
app.use(healthRoute);

module.exports = app;