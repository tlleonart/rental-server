const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/users.schema');

const UserService = require('../services/user.service');

const router = express.Router();

const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await service.findOne(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedUser = await service.update(id, body);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/filter', async (req, res, next) => {
  try {
    const { query } = req;
    const orderedUsers = await service.filter(query);
    res.json(orderedUsers);
  } catch (error) {
    next(error);
  }
});

router.patch('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await service.delete(id, { isDeleted: body.isDeleted });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const newUser = await service.create(body);

      res.json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
