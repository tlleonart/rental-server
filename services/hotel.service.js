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
        children: hotel.rooms[0].maxChildren,
        maxPax: hotel.rooms[0].maxPax,
        gallery: hotel.images.filter((img) => img.imageTypeCode === 'GEN' || img.imageTypeCode === 'PIS').map((i) => ({
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

  async findOne(id) {
    const hotel = await models.Hotel.findByPk(id);

    if (!hotel) {
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

    await hotelDeleted.update(body);

    return `${id} deleted`;
  }
}

module.exports = HotelService;
