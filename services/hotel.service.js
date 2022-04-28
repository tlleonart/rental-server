const axios = require('axios');
const boom = require('@hapi/boom');
const { url, apiKey, signature } = require('./utils');
const { models } = require('../libs/sequelize');

class HotelService {
  constructor() {}

  async findApi() {
    const apiHotels = [];
    const getHotels = async () => {
      try {
        const apiReq = await axios.get(url, { headers: { 'Api-key': apiKey, 'X-Signature': signature } });
        apiHotels.push(apiReq.data.hotels);
        apiHotels[0].map((hotel) => {
          const obj = {
            id: hotel.code,
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
            gallery: hotel.images[0],
            amenities: hotel.facilities[0],
          };
          return obj;
        });
        return apiHotels;
      } catch (error) {
        console.error(error);
      }
    };

    getHotels();
  }

  async dbLoad() {
    const apiHotels = await this.findApi();
    apiHotels.forEach((h) => {
      models.Hotel.findOrCreate({ where: { name: h.name } });
    });

    const dbHotels = models.Hotel.findAll();

    return dbHotels;
  }

  async find() {
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
}

module.exports = HotelService;
