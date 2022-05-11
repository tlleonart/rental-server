const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const { amenities } = require('../api/api.json');

class AmenityService {
  constructor() {}

  async dbLoadAmenities() {
    await amenities.map((a) => this.create(a));
  }

  async find() {
    const allAmenities = await models.Amenity.findAll();

    if (allAmenities.length === 0) {
      await this.dbLoadAmenities();
    }

    return allAmenities;
  }

  async findById(id) {
    const amenity = await models.Amenity.findByPk(id);

    if (!amenity) {
      throw boom.notFound('Amenity Not Found');
    }

    return amenity;
  }

  async create(body) {
    const newAmenity = await models.Amenity.create(body);

    return newAmenity;
  }

  async delete(id, body) {
    const amenity = await this.findById(id);

    const amenityDeleted = await amenity.update(body);

    return amenityDeleted;
  }

  async update(id, body) {
    const amenity = await this.findById(id);
    const updatedAmenity = await amenity.update(body);

    return updatedAmenity;
  }
}

module.exports = AmenityService;
