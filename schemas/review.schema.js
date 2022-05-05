const Joi = require('joi');

const id = Joi.number();
const description = Joi.string();
const score = Joi.string().valid('1', '2', '3', '4', '5');
const priceQualityRatio = Joi.string().valid('1', '2', '3', '4', '5');
const facilities = Joi.string().valid('1', '2', '3', '4', '5');
const location = Joi.string().valid('1', '2', '3', '4', '5');
const cleaning = Joi.string().valid('1', '2', '3', '4', '5');
const attentionService = Joi.string().valid('1', '2', '3', '4', '5');
const comfortable = Joi.string().valid('1', '2', '3', '4', '5');
const stayedOn = Joi.string();

const getReviewSchema = Joi.object({
  id: id.required(),
});

const createReviewSchema = Joi.object({
  description: description.required(),
  score: score.required(),
  priceQualityRatio: priceQualityRatio.required(),
  facilities: facilities.required(),
  location: location.required(),
  cleaning: cleaning.required(),
  attentionService: attentionService.required(),
  comfortable: comfortable.required(),
  stayedOn: stayedOn.required(),
});

const updateReviewSchema = Joi.object({
  description,
  score,
  priceQualityRatio,
  facilities,
  location,
  cleaning,
  attentionService,
  comfortable,
  stayedOn,
});

module.exports = { createReviewSchema, updateReviewSchema, getReviewSchema };
