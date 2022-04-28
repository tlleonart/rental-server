const express = require('express');

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

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await service.delete(id, body);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
