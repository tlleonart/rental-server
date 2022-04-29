const express = require('express');

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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const hotel = await service.findById(id);

    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    const newHotel = await service.create(body);

    res.json(newHotel);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { body } = req;

    const updatedHotel = await service.update(id, body);

    res.json(updatedHotel);
  } catch (error) {
    next(error);
  }
});
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const hotel = await service.delete(id, body);

    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
