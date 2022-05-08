const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const CityId = Joi.string();

const getCountrySchema = Joi.object({
  id: id.required(),
});

const createCountrySchema = Joi.object({
  name: name.required(),
  CityId: CityId.required(),
});

const updateCountrySchema = Joi.object({
  name,
  CityId,
});

module.exports = { createCountrySchema, updateCountrySchema, getCountrySchema };
