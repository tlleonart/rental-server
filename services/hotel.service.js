const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { hotels } = require('../api/api.json');
const UserService = require('./user.service');

const userService = new UserService();

class HotelService {
  constructor() {}

  async dbLoad() {
    hotels.map((h) => this.create(h));
  }

  async find() {
    const dbHotel = await models.Hotel.findAll({ include: [models.Country, models.City] });

    if (dbHotel.length === 0) {
      await this.dbLoad();
    }

    return dbHotel;
  }

  async findById(id) {
    const hotel = await models.Hotel.findByPk(id, {
      include: [models.Country, models.City, models.User,
        models.Booking, models.Review],
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
        if (p[0] === 'CountryId') {
          const CountryId = {
            [p[0]]: {
              [Op.eq]: p[1],
            },
          };
          return CountryId;
        }
        if (p[0] === 'CityId') {
          const CityId = {
            [p[0]]: {
              [Op.eq]: p[1],
            },
          };
          return CityId;
        }
        if (p[0] === 'id') {
          const id = {
            [p[0]]: {
              [Op.eq]: p[1],
            },
          };
          return id;
        }
        if (p[0] === 'price') {
          const price = {
            [p[0]]: {
              [Op.lte]: p[1],
            },
          };
          return price;
        }
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

    const filteredHotels = await models.Hotel.findAll({
      include: [models.Country, models.City],
      where: attributes,
    });

    return filteredHotels;
  }

  async create(body) {
    const newHotel = await models.Hotel.create(body);

    if (newHotel) {
      await userService.update(newHotel.UserId, { role: 'owner' });
    }
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
