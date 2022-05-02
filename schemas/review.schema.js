const Joi = require('joi');

const id = Joi.number();
const title = Joi.string();
const description = Joi.string();
const score = Joi.string().valid('1', '2', '3', '4', '5');

const getReviewSchema = Joi.object({
  id: id.required(),
});

const createReviewSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  score: score.required(),
});

const updateReviewSchema = Joi.object({
  title,
  description,
  score,
});

module.exports = { createReviewSchema, updateReviewSchema, getReviewSchema };
