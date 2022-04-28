const axios = require('axios');
const boom = require('@hapi/boom');
const { url, apiKey, signature } = require('./utils');
const { models } = require('../libs/sequelize');

class HotelService {
  constructor() {}

  async findApi() {
    const hotelReq = await axios.get(url, { headers: { 'Api-key': apiKey, 'X-Signature': signature } });
    const hotelsApi = await hotelReq.data.hotels.map((hotel) => {
      const hotelObj = {
        name: hotel.name.content,
        description: hotel.description.content,
        stars: hotel.S2C,
        ranking: hotel.ranking,
        countryCode: hotel.countryCode,
        latitude: hotel.coordinates.latitude,
        longitude: hotel.coordinates.longitude,
        address: hotel.address.content,
        city: hotel.city.content,
        postalCode: hotel.postalCode,
        email: hotel.email,
        phones: hotel.phones[0].phoneNumber,
        childrens: hotel.rooms[0].maxChildren,
        maxPax: hotel.rooms[0].maxPax,
      };
      return hotelObj;
    });
    return hotelsApi;
  }

  async dbLoad() {
    const apiHotels = await this.findApi();
    apiHotels.map((h) => models.Hotel.findOrCreate({
      where: {
        name: h.name.content,
        description: h.description.content,
        stars: h.S2C,
        ranking: h.ranking,
        countryCode: h.countryCode,
        latitude: h.coordinates.latitude,
        longitude: h.coordinates.longitude,
        address: h.address.content,
        city: h.city.content,
        postalCode: h.postalCode,
        email: h.email,
        phones: h.phones[0].phoneNumber,
        childrens: h.rooms[0].maxChildren,
        maxPax: h.rooms[0].maxPax,
      },
    }));
  }

  async find() {
    await this.dbLoad();
    const hotels = await models.Hotel.findAll();

    return hotels;
  }

  async findOne(id) {
    const hotel = await models.Hotel.findByPk(id);

    if (!hotel) {
      throw boom.notFound('Hotel Not Found');
    }
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

    await hotelDeleted.update(body);

    return `${id} deleted`;
  }
}

module.exports = HotelService;
