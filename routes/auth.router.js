const express = require('express');

const { OAuth2Client } = require('google-auth-library');

const passport = require('passport');

const { where } = require('sequelize/types');
const AuthService = require('../services/auth.service');

const { models } = require('../libs/sequelize');

const router = express.Router();

const service = new AuthService();

s;

const keys = {
  clientId: '673120548612-hukb89n0hg4lhlpr3jkjf1g2l2cb2j3n.apps.googleusercontent.com',
  projectId: 'Cliente web 1',
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
  clientSecret: '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',
  javascriptOrigins: ['http://localhost:3001', 'http://localhost:3000'],
};

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

router.post('/google', async (req, res, next) => {
  try {
    const client = new OAuth2Client(keys.clientId);

    const { wc, userType } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: wc.id_token,
      audience: keys.clientId,
    });

    const userValidate = await models.User.findOne({
      where: {
        email: ticket.payload.email,
      },
    });

    console.log(userValidate);
  } catch (error) {
    next(error);
  }
});

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
