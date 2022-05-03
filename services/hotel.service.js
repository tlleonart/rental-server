const axios = require('axios');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { url, apiKey, signature } = require('./utils');
const { models } = require('../libs/sequelize');

class HotelService {
  constructor() {}

  async findApi() {
    const hotelReq = await axios.get(url, {
      headers: { 'Api-key': apiKey, 'X-Signature': signature },
    });
    const hotelsApi = await hotelReq.data.hotels.map((hotel) => {
      const hotelObj = {
        name: hotel.name.content,
        description: hotel.description.content,
        stars: hotel.S2C,
        ranking: hotel.ranking,
        price: Math.floor(Math.random() * (100 - hotel.ranking) * 40),
        countryCode: hotel.countryCode,
        latitude: hotel.coordinates.latitude,
        longitude: hotel.coordinates.longitude,
        address: hotel.address.content,
        city: hotel.city.content,
        postalCode: hotel.postalCode,
        email: hotel.email,
        phones: hotel.phones[0].phoneNumber,
        children: hotel.rooms ? hotel.rooms[0].maxChildren : 1,
        maxPax: hotel.rooms ? hotel.rooms[0].maxPax : 2,
        gallery: hotel.images
          .filter(
            (img) => img.imageTypeCode === 'GEN' || img.imageTypeCode === 'PIS',
          )
          .map((i) => ({
            imageTypeCode: i.imageTypeCode,
            path: `http://photos.hotelbeds.com/giata/original/${i.path}`,
          })),
      };
      return hotelObj;
    });
    return hotelsApi;
  }

  async dbLoad() {
    const apiHotels = await this.findApi();

    apiHotels.map((h) => models.Hotel.create(h));
  }

  async find() {
    const hotels = await models.Hotel.findAll();

    if (hotels.length === 0) {
      await this.dbLoad();
    }

    return hotels;
  }

  async filter({ prop, value }) {
    if (!prop && !value) {
      throw boom.notFound('Query Not Found');
    }
    const filteredHotels = await models.Hotel.findAll({
      order: [[prop, value]],
    });
    return filteredHotels.slice(0, 10);
  }

  async findById(id) {
    const hotel = await models.Hotel.findByPk(id);

    if (!hotel) {
      throw boom.notFound('Hotel Not Found');
    }

    return hotel;
  }

  async findByName(name) {
    const hotels = await this.find();
    const hotel = hotels.filter((h) => h.name.toLowerCase().includes(name.toLowerCase()));

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
