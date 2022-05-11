const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const { cities } = require('../api/api.json');

class CityService {
  constructor() {}

  async dbLoadCities() {
    cities.map((c) => this.create(c));
  }

  async find() {
    const allCities = await models.City.findAll();

    if (allCities.length === 0) {
      await this.dbLoadCities();
    }

    return allCities;
  }

  async findById(id) {
    const city = await models.City.findByPk(id, {
      include: [models.Country, models.Hotel],
    });

    if (!city) {
      throw boom.notFound('City Not Found');
    }

    return city;
  }

  async create(body) {
    const newCity = await models.City.create(body);

    return newCity;
  }

  async delete(id, body) {
    const city = await this.findById(id);

    const cityDeleted = await city.update(body);

    return cityDeleted;
  }

  async update(id, body) {
    const city = await this.findById(id);
    const updatedCity = await city.update(body);

    return updatedCity;
  }
}

module.exports = CityService;
