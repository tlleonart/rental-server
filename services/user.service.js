const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const users = await models.User.findAll();

    if (!users) {
      throw boom.notFound('Users Not Found');
    }

    return users;
  }

  async filter({ prop, value }) {
    const users = await models.User.findAll({
      order: [[prop, value]],
    });
    return users;
  }

  async delete(id, body) {
    const user = await this.findOne(id);

    await user.update(body);

    return `${id} deleted`;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    return user;
  }

  async create(body) {
    const newUser = await models.User.create(body);

    return newUser;
  }

  async update(id, body) {
    const user = await this.findOne(id);

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    const updatedUser = await user.update(body);

    return updatedUser;
  }
}

module.exports = UserService;
