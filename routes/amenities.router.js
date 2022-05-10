const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getAmenitySchema, createAmenitySchema, updateAmenitySchema } = require('../schemas/amenities.schema');

const AmenityService = require('../services/amenity.service');

const router = express.Router();

const service = new AmenityService();

router.get('/', async (req, res, next) => {
  try {
    const amenities = await service.find();

    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getAmenitySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const amenity = await service.findById(id);

      res.json(amenity);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getAmenitySchema, 'params'),
  validatorHandler(updateAmenitySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedAmenity = await service.update(id, body);

      res.json(updatedAmenity);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const amenity = await service.delete(id, body);
    res.json(amenity);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createAmenitySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newAmenity = await service.create(body);

      res.json(newAmenity);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
