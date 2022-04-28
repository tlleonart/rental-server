const express = require('express');

const HotelService = require('../services/hotel.service');

const router = express.Router();

const service = new HotelService();

router.get('/', async (req, res, next) => {
  try {
    const hotels = await service.findApi();

    res.json(hotels);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const hotel = await service.findOne(id);

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

module.exports = router;
