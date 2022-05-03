const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const lastName = Joi.string();
const userName = Joi.string();
const email = Joi.string();
const birthDate = Joi.string();
const password = Joi.string();
const repeatPassword = Joi.string().valid(Joi.ref('password'));
const profilePic = Joi.string();
const role = Joi.string();
const hotels = Joi.array().items(Joi.string());

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  userName: userName.required(),
  email: email.required(),
  birthDate: birthDate.required(),
  password: password.required(),
  repeatPassword: repeatPassword.required(),
  profilePic,
  hotels,
});

const updateUserSchema = Joi.object({
  name,
  lastName,
  userName,
  email,
  birthDate,
  password,
  repeatPassword,
  profilePic,
});

module.exports = { getUserSchema, updateUserSchema, createUserSchema };
