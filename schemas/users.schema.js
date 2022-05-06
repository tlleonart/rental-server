const Joi = require('joi');

const id = Joi.number();
const typePerson = Joi.string().valid('natural', 'legal');
const firstName = Joi.string();
const lastName = Joi.string();
const organization = Joi.string();
const email = Joi.string();
const password = Joi.string();
const repeatPass = Joi.ref('password');
const role = Joi.string().valid('admin', 'customer', 'owner');
const image = Joi.string();
const hotels = Joi.array().items(Joi.number());
const isDeleted = Joi.boolean();

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  typePerson: typePerson.required(),
  firstName,
  lastName,
  organization,
  email: email.required(),
  password: password.required(),
  repeatPass,
  image,
  hotels,
});

const updateUserSchema = Joi.object({
  typePerson,
  firstName,
  lastName,
  organization,
  email,
  password,
  repeatPass,
  image,
  role,
  isDeleted,
});

module.exports = { getUserSchema, updateUserSchema, createUserSchema };
