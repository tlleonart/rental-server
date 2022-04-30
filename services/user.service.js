const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

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

    const userDeleted = await user.update(body);

    return userDeleted;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    return user;
  }

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10);

    const newUser = await models.User.create({
      ...body,
      password: hash,
      repeatPassword: hash,
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.repeatPassword;
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
