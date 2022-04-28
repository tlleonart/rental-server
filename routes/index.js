const express = require('express');

const usersRouter = require('./users.router');
const hotelsRouter = require('./hotels.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/hotels', hotelsRouter);
}

module.exports = routerApi;
