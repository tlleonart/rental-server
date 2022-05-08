const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CountryService {
  constructor() {}

  async find() {
    const allCountries = await models.Country.findAll();

    if (!allCountries) {
      throw boom.notFound('Countries Not Found');
    }

    return allCountries;
  }

  async findById(id) {
    const country = await models.Country.findByPk(id, {
      include: [models.City],
    });

    if (!country) {
      throw boom.notFound('Country Not Found');
    }

    return country;
  }

  async create(body) {
    const newCountry = await models.Country.create(body);

    return newCountry;
  }

  async delete(id, body) {
    const country = await this.findById(id);

    const countryDeleted = await country.update(body);

    return countryDeleted;
  }

  async update(id, body) {
    const country = await this.findById(id);
    const updatedCountry = await country.update(body);

    return updatedCountry;
  }
}

module.exports = CountryService;
