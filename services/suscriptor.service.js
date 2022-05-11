const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { suscriptors } = require('../api/api.json');

class SuscriptorService {
  constructor() {}

  async dbLoadSuscriptors() {
    await suscriptors.map((s) => this.create(s));
  }

  async find() {
    const allSuscriptors = await models.Suscriptor.findAll();

    if (allSuscriptors.length === 0) {
      await this.dbLoadSuscriptors();
    }

    return allSuscriptors;
  }

  async findByMail(mail) {
    const suscriptor = await models.Suscriptor.findOne({
      where: { mail },
    });

    return suscriptor;
  }

  async findById(id) {
    const suscriptor = await models.Suscriptor.findByPk(id);

    if (!suscriptor) {
      throw boom.notFound('User Not Found');
    }

    return suscriptor;
  }

  async create(mail) {
    const newSuscriptor = await models.Suscriptor.create(mail);

    return newSuscriptor;
  }

  async update(id, body) {
    const suscriptor = await this.findById(id);

    if (!suscriptor) {
      throw boom.notFound('User Not Found');
    }

    const updatedSuscriptor = await suscriptor.update(body);

    return updatedSuscriptor;
  }
}

module.exports = SuscriptorService;
