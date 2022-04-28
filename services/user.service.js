const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const users = await models.User.findAll();

    return users;
  }

  async delete(id, body) {
    const user = await this.findOne(id);

    await user.update(body);

    return `${id} deleted`;
  }
}

module.exports = UserService;
