const express = require('express');

const usersRouter = require('./users.router');
const hotelsRouter = require('./hotels.router');
const authRouter = require('./auth.router');
const reviewsRouter = require('./reviews.router');
const bookingsRouter = require('./bookings.router');
const billingsRouter = require('./billings.router');
const countriesRouter = require('./countries.router');
const citiesRouter = require('./cities.router');
const suscriptorsRouter = require('./suscriptors.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/hotels', hotelsRouter);
  router.use('/auth', authRouter);
  router.use('/reviews', reviewsRouter);
  router.use('/bookings', bookingsRouter);
  router.use('/billings', billingsRouter);
  router.use('/countries', countriesRouter);
  router.use('/cities', citiesRouter);
  router.use('/suscriptors', suscriptorsRouter);
}

module.exports = routerApi;
