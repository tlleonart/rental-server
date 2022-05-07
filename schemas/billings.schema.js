const Joi = require('joi');

const id = Joi.number();
const otherCharges = Joi.number();
const isCancelled = Joi.boolean();
const total = Joi.number();
const UserId = Joi.number();
const HotelId = Joi.number();
const BookingId = Joi.number();

const getBillingSchema = Joi.object({
  id: id.required(),
});

const createBillingSchema = Joi.object({
  otherCharges,
  total,
  UserId,
  HotelId,
  BookingId: BookingId.required(),
});

const updateBillingSchema = Joi.object({
  otherCharges,
  total,
  isCancelled,
});

module.exports = { createBillingSchema, updateBillingSchema, getBillingSchema };
