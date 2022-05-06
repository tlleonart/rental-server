const Joi = require('joi');

const id = Joi.number();
const mail = Joi.string();
const isSuscribed = Joi.boolean();

const getSuscriptorSchema = Joi.object({
  id: id.required(),
});

const createSuscriptorSchema = Joi.object({
  mail: mail.required(),
});

const updateSuscriptorSchema = Joi.object({
  mail,
  isSuscribed,
});

module.exports = { createSuscriptorSchema, updateSuscriptorSchema, getSuscriptorSchema };
