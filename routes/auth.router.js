const express = require('express');

const passport = require('passport');

const AuthService = require('../services/auth.service');

const service = new AuthService();

const UserService = require('../services/user.service');

const userService = new UserService();

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;

      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;

      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/getGoogleUser',
  async (req, res, next) => {
    try {
      const user = await userService.find();

      const userLength = user.length;

      res.json(service.signToken(user[userLength - 1]));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const rta = await service.sendRecoveryPassword(email);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;

      const rta = await service.changePassword(token, newPassword);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
