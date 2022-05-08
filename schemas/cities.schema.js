const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const CountryId = Joi.string();
const HotelId = Joi.string();

const getCitySchema = Joi.object({
  id: id.required(),
});

const createCitySchema = Joi.object({
  name: name.required(),
  HotelId: HotelId.required(),
  CountryId: CountryId.required(),
});

const updateCitySchema = Joi.object({
  name,
  HotelId,
  CountryId,
});

module.exports = { createCitySchema, updateCitySchema, getCitySchema };
