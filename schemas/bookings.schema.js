const Joi = require('joi');

const id = Joi.number();
const checkIn = Joi.date();
const checkOut = Joi.date();
const nights = Joi.number();
const pricePerNight = Joi.number();
const payMethod = Joi.string();
const isCancelled = Joi.boolean();
const UserId = Joi.number();
const HotelId = Joi.number();

const getBookingSchema = Joi.object({
  id: id.required(),
});

const createBookingSchema = Joi.object({
  checkIn: checkIn.required(),
  checkOut: checkOut.required(),
  nights: nights.required(),
  pricePerNight: pricePerNight.required(),
  payMethod: payMethod.required(),
  UserId: UserId.required(),
  HotelId: HotelId.required(),
});

const updateBookingSchema = Joi.object({
  checkIn,
  checkOut,
  nights,
  pricePerNight,
  payMethod,
  isCancelled,
  UserId,
  HotelId,
});

module.exports = { createBookingSchema, updateBookingSchema, getBookingSchema };
