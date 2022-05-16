const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createSuscriptorSchema, updateSuscriptorSchema, getSuscriptorSchema } = require('../schemas/suscriptors.schema');
const SuscriptorService = require('../services/suscriptor.service');

const router = express.Router();
const service = new SuscriptorService();

router.get('/', async (req, res, next) => {
  try {
    const suscriptors = await service.find();

    res.json(suscriptors);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getSuscriptorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const suscriptor = await service.findById(id);

      res.json(suscriptor);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getSuscriptorSchema, 'params'),
  validatorHandler(updateSuscriptorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedSuscriptor = await service.update(id, body);

      res.json(updatedSuscriptor);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createSuscriptorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newSuscriptor = await service.create(body);

      res.json(newSuscriptor);
    } catch (error) {
      next(error);
    }
  },
);

router.post (
  '/sendMails',
  async (req, res, next) => {
    try {
      await service.sendMonthlyMails ()

      res.json ({message: 'All Monthly Mails Sent!'})
    } catch (error) {
      next (error)
    }
  }
)

module.exports = router;
