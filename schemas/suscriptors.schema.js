const Joi = require('joi');

const id = Joi.number();
const email = Joi.string();
const isSuscribed = Joi.boolean();

const getSuscriptorSchema = Joi.object({
  id: id.required(),
});

const createSuscriptorSchema = Joi.object({
  email: email.required(),
});

const updateSuscriptorSchema = Joi.object({
  email,
  isSuscribed,
});

module.exports = { createSuscriptorSchema, updateSuscriptorSchema, getSuscriptorSchema };
