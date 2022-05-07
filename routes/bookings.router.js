const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getBookingSchema, createBookingSchema, updateBookingSchema } = require('../schemas/bookings.schema');

const BookingService = require('../services/booking.service');

const router = express.Router();

const service = new BookingService();

router.get('/', async (req, res, next) => {
  try {
    const bookings = await service.find();

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getBookingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const booking = await service.findById(id);

      res.json(booking);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getBookingSchema, 'params'),
  validatorHandler(updateBookingSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedBooking = await service.update(id, body);

      res.json(updatedBooking);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/order', async (req, res, next) => {
  try {
    const { query } = req;
    const orderedBookings = await service.order(query);
    res.json(orderedBookings);
  } catch (error) {
    next(error);
  }
});

router.post('/filter', async (req, res, next) => {
  try {
    const { body } = req;
    const filteredBookings = await service.filter(body);
    res.json(filteredBookings);
  } catch (error) {
    next(error);
  }
});

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const booking = await service.delete(id, { isCancelled: body.isCancelled });
    res.json(booking);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createBookingSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newBooking = await service.create(body);

      res.json(newBooking);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
