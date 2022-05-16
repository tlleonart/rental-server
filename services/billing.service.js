const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const { models } = require('../libs/sequelize');
const BookingsService = require('./booking.service');
const { config } = require('../config/config');

const bookingService = new BookingsService();

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
    if (newBilling) {
      await bookingService.update(BookingId, { paidOut: true });
    }
    const data = await this.findById(newBilling.dataValues.id);

    const mail = {
      from: 'bookings@rental.com',
      to: data.User.email,
      subject: 'Tu reserva está confirmada!',
      html: `<h4>Hola ${data.User.organization || data.User.firstName}, tu reserva en ${data.Hotel.name} está confirmada!</h4>
      <p>Imprime este voucher y presentalo al anfitrión.</p><br/>
      <p>Check In: ${data.Booking.checkIn} a las 13 hora local</p>
      <p>Check Out: ${data.Booking.checkOut} a las 10 hora local</p>
      <p>Monto pagado: ARS ${data.total}</p><br/>
      <p>Muchas gracias!</p>
      <p>Te esperamos en tu próxima reserva, el equipo de <a href='https://rental-app-client.netlify.app'>Rental App</a></p>`,
    };
    await this.sendMail(mail);
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

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Booking Confirmation Mail Sent' };
  }
}

module.exports = BillingService;
