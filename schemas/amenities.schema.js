const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();

const getAmenitySchema = Joi.object({
  id: id.required(),
});

const createAmenitySchema = Joi.object({
  name: name.required(),
});

const updateAmenitySchema = Joi.object({
  name,
});

module.exports = { createAmenitySchema, updateAmenitySchema, getAmenitySchema };
