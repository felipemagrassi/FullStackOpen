const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRoutes = require('./controllers/blogRoutes');

logger.info('connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blog', blogRoutes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
