const bcrypt = require('bcrypt');

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const { users } = require('../api/api.json');

class UserService {
  constructor() {}

  async dbLoadUsers() {
    console.log(users[0]);
    users.map((u) => this.create(u));
  }

  async find() {
    const allUsers = await models.User.findAll();

    if (allUsers.length === 0) {
      await this.dbLoadUsers();
    }

    return allUsers;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });

    return user;
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
    const user = await models.User.findByPk(id, { include: models.Hotel });

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    return user;
  }

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10);

    const newUser = await models.User.create({ ...body, password: hash, repeatPass: hash });

    delete newUser.dataValues.password;
    delete newUser.dataValues.repeatPass;

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
