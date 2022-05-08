const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { hotels } = require('../api/api.json');

class HotelService {
  constructor() {}

  async dbLoad() {
    hotels.map((h) => this.create(h));
  }

  async find() {
    const dbHotel = await models.Hotel.findAll();

    if (dbHotel.length === 0) {
      await this.dbLoad();
    }

    return dbHotel;
  }

  async findById(id) {
    const hotel = await models.Hotel.findByPk(id, {
      include: [models.User, models.Review, models.Booking],
    });

    if (!hotel) {
      throw boom.notFound('Hotel Not Found');
    }

    return hotel;
  }

  async findByName(name) {
    const hotelByName = await this.find();
    const hotel = hotelByName.filter((h) => h.name.toLowerCase().includes(name.toLowerCase()));

    if (!hotel.length) {
      throw boom.notFound('Hotel Not Found');
    }

    return hotel;
  }

  async order({ prop, value }) {
    if (!prop && !value) {
      throw boom.notFound('Query Not Found');
    }
    const orderedHotels = await models.Hotel.findAll({
      order: [[prop, value]],
    });
    return orderedHotels.slice(0, 10);
  }

  async filter(body) {
    const payload = Object.entries(body);

    if (!payload) {
      throw boom.notFound('Body Not Found');
    }

    const attributes = payload.map((p) => {
      if (!isNaN(p[1])) {
        const number = {
          [p[0]]: {
            [Op.gte]: p[1],
          },
        };
        return number;
      }
      const obj = {
        [p[0]]: { [Op.iLike]: `%${p[1]}%` },
      };
      return obj;
    });

    const filteredHotels = await models.Hotel.findAll({ where: attributes });

    return filteredHotels;
  }

  async create(body) {
    const newHotel = await models.Hotel.create(body);
    // const userOwner = await models.User.findAll({
    //   where: { id: body.user },
    // });
    // newHotel.addUsers(userOwner);

    return newHotel;
  }

  async update(id, body) {
    const hotel = await this.findById(id);

    const updatedHotel = await hotel.update(body);

    return updatedHotel;
  }

  async delete(id, body) {
    const hotelDeleted = await this.findById(id);

    const deleted = await hotelDeleted.update(body);

    return deleted;
  }
}

module.exports = HotelService;
