const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const description = Joi.string();
const stars = Joi.number().valid(1, 2, 3, 4, 5);
const price = Joi.number();
const country = Joi.string();
const city = Joi.string();
const address = Joi.string();
const latitude = Joi.number();
const longitude = Joi.number();
const guests = Joi.number();
const children = Joi.number();
const email = Joi.string();
const phone = Joi.string();
const web = Joi.string();
const mainImage = Joi.string();
const roomImage = Joi.string();
const barImage = Joi.string();
const amenitiesImage = Joi.string();
const otherImage = Joi.string();
// const image = Joi.array().items(Joi.object());
const UserId = Joi.number();

const getHotelSchema = Joi.object({
  id: id.required(),
});

const createHotelSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  stars,
  price: price.required(),
  country: country.required(),
  city: city.required(),
  address: address.required(),
  latitude: latitude.required(),
  longitude: longitude.required(),
  guests: guests.required(),
  children: children.required(),
  email,
  phone: phone.required(),
  web: web.required(),
  mainImage: mainImage.required(),
  roomImage: roomImage.required(),
  barImage: barImage.required(),
  amenitiesImage: amenitiesImage.required(),
  otherImage: otherImage.required(),
  UserId,
});

const updateHotelSchema = Joi.object({
  name,
  description,
  stars,
  price,
  country,
  city,
  address,
  latitude,
  longitude,
  guests,
  children,
  email,
  phone,
  web,
  mainImage,
  roomImage,
  barImage,
  amenitiesImage,
  otherImage,
  UserId,
});

module.exports = { createHotelSchema, updateHotelSchema, getHotelSchema };
