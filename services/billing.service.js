const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BillingService {
  constructor() {}

  async find() {
    const allBillings = await models.Billing.findAll();

    if (!allBillings) {
      throw boom.notFound('Billings Not Found');
    }

    return allBillings;
  }

  async findById(id) {
    const billing = await models.Billing.findByPk(id, {
      include: [models.Hotel, models.User, models.Booking],
    });

    if (!billing) {
      throw boom.notFound('Billing Not Found');
    }

    return billing;
  }

  async create(body) {
    const { BookingId, otherCharges } = body;
    const booking = await models.Booking.findByPk(BookingId, {
      attributes: ['nights', 'pricePerNight', 'UserId', 'HotelId'],
    });
    const total = otherCharges === undefined
      ? booking.dataValues.nights * booking.dataValues.pricePerNight
      : ((booking.dataValues.nights * booking.dataValues.pricePerNight) + otherCharges);
    const { UserId } = booking.dataValues;
    const { HotelId } = booking.dataValues;
    const newBilling = await models.Billing.create({
      UserId, HotelId, BookingId, otherCharges, total,
    });

    return newBilling;
  }

  async delete(id, body) {
    const billing = await this.findById(id);

    const billingCanceled = await billing.update(body);

    return billingCanceled;
  }

  async update(id, { otherCharges }) {
    const billing = await this.findById(id);
    const total = otherCharges + billing.dataValues.total;
    const updatedBilling = await billing.update({ total, otherCharges });

    return updatedBilling;
  }
}

module.exports = BillingService;
