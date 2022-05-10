const { Strategy } = require('passport-google-oauth20');

const { config } = require('../../../config/config');

const { models } = require('../../../libs/sequelize');

const GoogleStrategy = new Strategy(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl,
  },
  ((accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }),
);

module.exports = GoogleStrategy;
