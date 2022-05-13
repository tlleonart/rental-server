/* eslint-disable no-underscore-dangle */

const passport = require('passport');

const { Strategy } = require('passport-google-oauth20');

const { models } = require('../../../libs/sequelize');

const { config } = require('../../../config/config');

const GoogleStrategy = new Strategy(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl,
  },
  async (accessToken, refreshToken, profile, done) => {
    const googleUser = profile._json;

    let user = {};
    try {
      const dbUser = await models.User.findOne({ where: { email: googleUser.email } });

      if (!dbUser) {
        // create
        user = {
          typePerson: 'natural',
          firstName: googleUser.name,
          lastName: googleUser.given_name,
          email: googleUser.email,
          password: googleUser.sub,
          repeatPass: googleUser.sub,
        };
        user = await models.User.create(user);
      } else {
        user = dbUser;
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = GoogleStrategy;
