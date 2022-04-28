const express = require('express');

const HotelService = require('../services/hotel.service');

const router = express.Router();

const service = new HotelService();

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
