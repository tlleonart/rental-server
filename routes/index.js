const express = require('express');

const usersRouter = require('./users.router');
const hotelsRouter = require('./hotels.router');
const authRouter = require('./auth.router');
const reviewsRouter = require('./reviews.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/hotels', hotelsRouter);
  router.use('/auth', authRouter);
  router.use('/reviews', reviewsRouter);
}

module.exports = routerApi;
