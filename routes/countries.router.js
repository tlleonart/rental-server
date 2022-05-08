const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getCountrySchema, createCountrySchema, updateCountrySchema } = require('../schemas/countries.schema');

const CountryService = require('../services/country.service');

const router = express.Router();

const service = new CountryService();

router.get('/', async (req, res, next) => {
  try {
    const countries = await service.find();

    res.json(countries);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCountrySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const country = await service.findById(id);

      res.json(country);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCountrySchema, 'params'),
  validatorHandler(updateCountrySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedCountry = await service.update(id, body);

      res.json(updatedCountry);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const country = await service.delete(id, body);
    res.json(country);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createCountrySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newCountry = await service.create(body);

      res.json(newCountry);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
