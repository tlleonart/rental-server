const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const { models } = require('../libs/sequelize');
const { config } = require('../config/config');

class ReviewService {
  constructor() {}

  async find() {
    const reviews = await models.Review.findAll();

    if (!reviews) {
      throw boom.notFound('Reviews Not Found');
    }

    return reviews;
  }

  async findById(id) {
    const review = await models.Review.findByPk(id, { include: [models.Booking] });

    if (!review) {
      throw boom.notFound('Review Not Found');
    }

    return review;
  }

  async create(body) {
    const {
      BookingId, priceQualityRatio, facilities, location, cleaning, attentionService, comfortable,
    } = body;

    const booking = await models.Booking.findByPk(BookingId, {
      attributes: ['id', 'UserId', 'HotelId'],
    });

    const { UserId } = booking.dataValues;

    const { HotelId } = booking.dataValues;

    const score = (priceQualityRatio + facilities + location + cleaning
      + attentionService + comfortable) / 6;

    const newReview = await models.Review.create({
      ...body, UserId, HotelId, score,
    });

    return newReview;
  }

  async update(id, body) {
    const review = await this.findById(id);

    const updatedReview = await review.update(body);

    return updatedReview;
  }

  async delete(id, body) {
    const reviewDeleted = await this.findById(id);

    const deleted = await reviewDeleted.update(body);

    return deleted;
  }

  async sendInvitation(today) {
    const reviewers = await models.Booking.findAll({
      where: {
        checkOut: today,
        paidOut: true,
        isCancelled: false,
      },
      include: [{
        model: models.User,
      }],
    });

    reviewers.map(async (reviewer) => {
      const mail = {
        from: 'reviews@rental.com',
        to: reviewer.User.email,
        subject: 'Cuéntanos sobre tu estadía!',
        html: `<h4>Hola ${reviewer.User.organization || reviewer.User.firstName}, queremos saber como fue tu experiencia en ${reviewer.hotelName}.</h4>
        <p>Cuéntale a la comunidad de Rental App como fue tu experiencia, dejando una breve reseña <a href='https://rental-app-client.netlify.app/profile'>aquí</a>.</p>
        <p>Te esperamos en tu próxima reserva, el equipo de <a href='https://rental-app-client.netlify.app'>Rental App</a></p>`,
      };
      await this.sendMail(mail);
    });
    return reviewers;
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

    return { message: 'Review Invitation Mail Sent' };
  }
}

module.exports = ReviewService;
