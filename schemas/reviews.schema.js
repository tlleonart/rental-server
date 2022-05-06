const Joi = require('joi');

const id = Joi.number();
const description = Joi.string();
const score = Joi.number().valid(1, 2, 3, 4, 5);
const priceQualityRatio = Joi.number().valid(1, 2, 3, 4, 5);
const facilities = Joi.number().valid(1, 2, 3, 4, 5);
const location = Joi.number().valid(1, 2, 3, 4, 5);
const cleaning = Joi.number().valid(1, 2, 3, 4, 5);
const attentionService = Joi.number().valid(1, 2, 3, 4, 5);
const comfortable = Joi.number().valid(1, 2, 3, 4, 5);
const stayedOn = Joi.string();
const UserId = Joi.number();
const isDeleted = Joi.boolean();

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
  UserId: UserId.required(),
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
  UserId,
  isDeleted,
});

module.exports = { createReviewSchema, updateReviewSchema, getReviewSchema };
