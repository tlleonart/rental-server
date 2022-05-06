const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getReviewSchema, createReviewSchema, updateReviewSchema } = require('../schemas/reviews.schema');

const ReviewService = require('../services/review.service');

const router = express.Router();

const service = new ReviewService();

router.get('/', async (req, res, next) => {
  try {
    const reviews = await service.find();

    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getReviewSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const review = await service.findById(id);

      res.json(review);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const review = await service.delete(id, { isDeleted: body.isDeleted });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getReviewSchema, 'params'),
  validatorHandler(updateReviewSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedReview = await service.update(id, body);

      res.json(updatedReview);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createReviewSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newReview = await service.create(body);

      res.json(newReview);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
