const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
    const booking = await models.Booking.findByPk(body.BookingId);
    const { UserId, HotelId } = booking.dataValues;
    const newReview = await models.Review.create(UserId, HotelId, body);

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
}

module.exports = ReviewService;
