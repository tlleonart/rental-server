const { Strategy } = require('passport-google-oauth20');

const passport = require('passport');

const { config } = require('../../../config/config');

const AuthService = require('../../../services/auth.service');

const UserService = require('../../../services/user.service');

const service = new AuthService();

const userService = new UserService();

// const LocalStrategy = new Strategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password',
//   },
//   async (email, password, done) => {
//     try {
//       const user = await service.getUser(email, password);

//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   },
// );

const GoogleStrategy = new Strategy(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('TODO');
    } catch (error) {
      done(error, false);
    }
  },
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = GoogleStrategy;
