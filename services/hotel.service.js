const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { hotels } = require('../API/db.json');

class HotelService {
  constructor() {}

  async dbLoad() {
    await hotels.map(async (h) => await models.Hotel.create(h));
  }

  async find() {
    const dbHotels = await models.Hotel.findAll();

    if (dbHotels.length === 0) {
      await this.dbLoad();
    }

    return dbHotels;
  }

  async order({ prop, value }) {
    if (!prop && !value) {
      throw boom.notFound('Query Not Found');
    }
    const filteredHotels = await models.Hotel.findAll({
      order: [[prop, value]],
    });
    return filteredHotels.slice(0, 10);
  }

  async filter(body) {
    const payload = Object.entries(body);
    if (!payload) {
      throw boom.notFound('Body Not Found');
    }
    const dbHotels = await this.find();
    const filteredHotels = payload?.map((p) => {
      const filter = dbHotels.filter((h) => h[p[0]].toLowerCase().includes(p[1].toLowerCase()));
      return filter;
    });
    return filteredHotels;
  }

  async findById(id) {
    const hotel = await models.Hotel.findByPk(id);

    if (!hotel) {
      throw boom.notFound('Hotel Not Found');
    }

    return hotel;
  }

  async findByName(name) {
    const dbHotels = await this.find();
    const hotel = dbHotels.filter((h) => h.name.toLowerCase().includes(name.toLowerCase()));

    if (!hotel.length) {
      throw boom.notFound('Hotel Not Found');
    }

    return hotel;
  }

  async create(body) {
    const newHotel = await models.Hotel.create(body);

    return newHotel;
  }

  async update(id, body) {
    const hotel = await this.findOne(id);

    const updatedHotel = await hotel.update(body);

    return updatedHotel;
  }

  async delete(id, body) {
    const hotelDeleted = await this.findOne(id);

    const deleted = await hotelDeleted.update(body);

    return deleted;
  }
}

module.exports = HotelService;
