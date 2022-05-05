const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const users = await models.User.findAll({ include: 'hotels' });

    if (!users) {
      throw boom.notFound('Users Not Found');
    }

    return users;
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
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    return user;
  }

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10);

    const newUser = await models.User.create({
      name: body.name,
      lastName: body.lastName,
      userName: body.userName,
      email: body.email,
      birthDate: body.birthDate,
      password: hash,
      profilePic: body.profilePic,
    });

    const hotels = await models.Hotel.findAll({
      where: { name: body.hotels },
    });

    delete newUser.dataValues.password;

    newUser.addHotels(hotels);

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
