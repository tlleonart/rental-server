const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getCitySchema, createCitySchema, updateCitySchema } = require('../schemas/cities.schema');

const CityService = require('../services/city.service');

const router = express.Router();

const service = new CityService();

router.get('/', async (req, res, next) => {
  try {
    const cities = await service.find();

    res.json(cities);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCitySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const city = await service.findById(id);

      res.json(city);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCitySchema, 'params'),
  validatorHandler(updateCitySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedCity = await service.update(id, body);

      res.json(updatedCity);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const city = await service.delete(id, body);
    res.json(city);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createCitySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newCity = await service.create(body);

      res.json(newCity);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
