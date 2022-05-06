const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const {
  getHotelSchema,
  createHotelSchema,
  updateHotelSchema,
} = require('../schemas/hotels.schema');

const HotelService = require('../services/hotel.service');

const router = express.Router();

const service = new HotelService();

router.get('/', async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    try {
      const hotels = await service.find();

      res.json(hotels);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const hotelByName = await service.findByName(name);

      res.json(hotelByName);
    } catch (error) {
      next(error);
    }
  }
});

router.get('/order', async (req, res, next) => {
  try {
    const { query } = req;
    const orderedHotels = await service.order(query);
    res.json(orderedHotels);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getHotelSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const hotel = await service.findById(id);

      res.json(hotel);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/filter', async (req, res, next) => {
  try {
    const { body } = req;

    const filteredHotels = await service.filter(body);

    res.json(filteredHotels);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createHotelSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newHotel = await service.create(body);

      res.json(newHotel);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getHotelSchema, 'params'),
  validatorHandler(updateHotelSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const { body } = req;

      const updatedHotel = await service.update(id, body);

      res.json(updatedHotel);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const hotel = await service.delete(id, { isDeleted: body.isDeleted });

    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
