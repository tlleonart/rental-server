const { Strategy } = require('passport-google-oauth20');

const { config } = require('../../../config/config');

const AuthService = require('../../../services/auth.service');

const service = new AuthService();

const GoogleStrategy = new Strategy();

module.exports = GoogleStrategy;
