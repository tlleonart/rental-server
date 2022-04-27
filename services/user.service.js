const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const users = await models.User.findAll();

    return users;
  }
}

module.exports = UserService;
