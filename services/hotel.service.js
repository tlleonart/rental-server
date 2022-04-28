class HotelService {
  constructor() {}

  async delete(id, body) {
    const hotelDeleted = await this.findOne(id);

    await hotelDeleted.update(body);

    return `${id} deleted`;
  }
}

module.exports = HotelService;
