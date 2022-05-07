const bcrypt = require('bcrypt');

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const { users } = require('../api/api.json');

class UserService {
  constructor() {}

  async dbLoadUsers() {
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

  async delete(id, body) {
    const user = await this.findById(id);

    const userDeleted = await user.update(body);

    return userDeleted;
  }

  async findById(id) {
    const user = await models.User.findByPk(id, {
      include: [models.Hotel, models.Review, models.Booking],
    });

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
    const user = await this.findById(id);

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    const updatedUser = await user.update(body);

    return updatedUser;
  }
}

module.exports = UserService;
