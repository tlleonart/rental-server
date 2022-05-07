const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BookingService {
  constructor() {}

  async find() {
    const allBookings = await models.Booking.findAll();

    if (!allBookings) {
      throw boom.notFound('Bookings Not Found');
    }

    return allBookings;
  }

  async findById(id) {
    const booking = await models.Booking.findByPk(id, {
      include: [models.Hotel, models.User, models.Billing],
    });

    if (!booking) {
      throw boom.notFound('Booking Not Found');
    }

    return booking;
  }

  async create(body) {
    const newBooking = await models.Booking.create(body);

    return newBooking;
  }

  async delete(id, body) {
    const booking = await this.findById(id);

    const bookingDeleted = await booking.update(body);

    return bookingDeleted;
  }

  async order({ prop, value }) {
    if (!prop && !value) {
      throw boom.notFound('Query Not Found');
    }
    const orderedBookings = await models.Booking.findAll({
      order: [[prop, value]],
    });
    return orderedBookings;
  }

  async filter(body) {
    const payload = Object.entries(body);

    if (!payload) {
      throw boom.notFound('Body Not Found');
    }

    const attributes = payload.map((p) => {
      const obj = { [p[0]]: p[1] };
      return obj;
    });

    const filteredBookings = await models.Booking.findAll({ where: attributes });

    return filteredBookings;
  }

  async update(id, body) {
    const booking = await this.findById(id);

    const updatedBooking = await booking.update(body);

    return updatedBooking;
  }
}

module.exports = BookingService;
