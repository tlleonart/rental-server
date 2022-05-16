const Joi = require('joi');

const id = Joi.number();
const checkIn = Joi.string();
const checkOut = Joi.string();
const nights = Joi.number();
const pricePerNight = Joi.number();
const payMethod = Joi.string();
const initPointMP = Joi.string();
const isCancelled = Joi.boolean();
const UserId = Joi.number();
const HotelId = Joi.number();
const mainImage = Joi.string();
const hotelName = Joi.string();
const paidOut = Joi.boolean();

const getBookingSchema = Joi.object({
  id: id.required(),
});

const createBookingSchema = Joi.object({
  checkIn: checkIn.required(),
  checkOut: checkOut.required(),
  nights,
  pricePerNight,
  payMethod,
  initPointMP,
  UserId: UserId.required(),
  HotelId: HotelId.required(),
  mainImage,
  hotelName,
  paidOut,
});

const updateBookingSchema = Joi.object({
  checkIn,
  checkOut,
  nights,
  pricePerNight,
  payMethod,
  initPointMP,
  isCancelled,
  UserId,
  HotelId,
  paidOut,
});

module.exports = { createBookingSchema, updateBookingSchema, getBookingSchema };
