const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const description = Joi.string();
const stars = Joi.string();
const ranking = Joi.number();
const price = Joi.number();
const countryCode = Joi.string();
const latitude = Joi.number();
const longitude = Joi.number();
const address = Joi.string();
const city = Joi.string();
const postalCode = Joi.string();
const email = Joi.string();
const phones = Joi.string();
const children = Joi.number();
const maxPax = Joi.number();
const user = Joi.number();

const imageTypeCode = Joi.string();
const path = Joi.string();

const gallery = Joi.array().items(Joi.object({
  imageTypeCode: imageTypeCode.required(),
  path: path.required(),
}));

const getHotelSchema = Joi.object({
  id: id.required(),
});

const createHotelSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  stars,
  ranking: ranking.required(),
  price: price.required(),
  countryCode: countryCode.required(),
  latitude: latitude.required(),
  longitude: longitude.required(),
  address: address.required(),
  city: city.required(),
  postalCode: postalCode.required(),
  email,
  phones: phones.required(),
  children: children.required(),
  maxPax: maxPax.required(),
  gallery: gallery.required(),
  user,
});

const updateHotelSchema = Joi.object({
  name,
  description,
  ranking,
  price,
  countryCode,
  latitude,
  longitude,
  address,
  city,
  postalCode,
  email,
  phones,
  children,
  maxPax,
  gallery,
});

module.exports = { createHotelSchema, updateHotelSchema, getHotelSchema };
