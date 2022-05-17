const express = require('express');

const jwks = require('jwks-rsa');

const { expressjwt: jwt } = require('express-jwt');

const { default: axios } = require('axios');
const AuthService = require('../services/auth.service');

const service = new AuthService();

const router = express.Router();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://rental-app-server.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://rental-app-server.com',
  issuer: 'https://rental-app-server.us.auth0.com/',
  algorithms: ['RS256'],
});

router.post(
  '/login',
  jwtCheck,
  async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const response = await axios.get('https://rental-app-server.us.auth0.com/userinfo', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      const user = response.data;
      res.json(service.signToken(user));
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
