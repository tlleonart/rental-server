const Joi = require('joi');

const id = Joi.number();
const checkIn = Joi.date();
const checkOut = Joi.date();
const nights = Joi.number();
const pricePerNight = Joi.numbre();
const payMethod = Joi.string();
const billing = Joi.string();
const isCancelled = Joi.boolean();

const getBookingSchema = Joi.object({
  id: id.required(),
});

const createBookingSchema = Joi.object({
  checkIn: checkIn.required(),
  checkOut: checkOut.required(),
  nights: nights.required(),
  pricePerNight: pricePerNight.required(),
  payMethod: payMethod.required(),
  billing: billing.required(),
});

const updateBookingSchema = Joi.object({
  checkIn,
  checkOut,
  nights,
  pricePerNight,
  payMethod,
  billing,
  isCancelled,
});

module.exports = { createBookingSchema, updateBookingSchema, getBookingSchema };
