const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const users = await models.User.findAll({ include: [models.Hotel, models.Review] });

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
    const newUser = await models.User.create(body);

    const hotels = await models.Hotel.findAll({
      where: { id: body.hotels },
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
