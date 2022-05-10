const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const HotelId = Joi.string();

const getAmenitySchema = Joi.object({
  id: id.required(),
});

const createAmenitySchema = Joi.object({
  name: name.required(),
  HotelId: HotelId.required(),
});

const updateAmenitySchema = Joi.object({
  name,
  HotelId,
});

module.exports = { createAmenitySchema, updateAmenitySchema, getAmenitySchema };
