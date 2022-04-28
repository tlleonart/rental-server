class HotelService {
  constructor() {}

  async delete(id, body) {
    const hotel = await this.findOne(id);

    await hotel.update(body);

    return `${id} deleted`;
  }
}

module.exports = HotelService;
