const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getBillingSchema, createBillingSchema, updateBillingSchema } = require('../schemas/billings.schema');

const BillingService = require('../services/billing.service');

const router = express.Router();

const service = new BillingService();

router.get('/', async (req, res, next) => {
  try {
    const billings = await service.find();

    res.json(billings);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getBillingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const billing = await service.findById(id);

      res.json(billing);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getBillingSchema, 'params'),
  validatorHandler(updateBillingSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedBilling = await service.update(id, body);

      res.json(updatedBilling);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const billing = await service.delete(id, { isCancelled: body.isCancelled });
    res.json(billing);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createBillingSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newBilling = await service.create(body);

      res.json(newBilling);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
