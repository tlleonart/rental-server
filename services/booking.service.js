const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const mercadopago = require('mercadopago');
const { models } = require('../libs/sequelize');
const { config } = require('../config/config');

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
    const hotelData = await models.Hotel.findByPk(body.HotelId);
    const { mainImage, name } = hotelData.dataValues;
    const newBooking = await models.Booking.create({ ...body, mainImage, hotelName: name });
    const {
      id, checkIn, checkOut, nights, pricePerNight,
    } = newBooking.dataValues;
    const totalPrice = nights * pricePerNight;
    const { email, organization, firstName } = await models.User.findByPk(body.UserId);

    mercadopago.configure({ access_token: config.accessToken });
    const preference = {
      items: [
        {
          title: 'Tu reserva en RentalApp',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: totalPrice,
        },
      ],
    };

    const payment = await mercadopago.preferences.create(preference);
    const { init_point } = payment.body;
    const booking = await this.update(id, { initPointMP: init_point });

    const mail = {
      from: 'bookings@rental.com',
      to: `${email}`,
      subject: `Felicitaciones ${organization || firstName}, tu reserva esta confirmada!`,
      html: `<h4>Hola ${organization || firstName}, tu reserva en ${name} está confirmada.</h4>
      <p>Check In: ${checkIn}</p>
      <p>Check Out: ${checkOut}</p>
      <p>Muchas gracias!</p>
      <a href=${payment.body.init_point}>Paga desde aquí</a>
      <a href='https://rental-app-client.netlify.app/profile'>Ir a tus reservas</a>`,
    };

    await this.sendMail(mail);

    return booking;
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

    return { message: 'New User Mail Sent' };
  }
}

module.exports = BookingService;
