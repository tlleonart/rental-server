const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ReviewService {
  constructor() {}

  async find() {
    const reviews = await models.Review.findAll({ include: [models.User, models.Hotel] });

    if (!reviews) {
      throw boom.notFound('Reviews Not Found');
    }

    return reviews;
  }

  async findById(id) {
    const review = await models.Review.findByPk(id, { include: [models.User, models.Hotel] });

    if (!review) {
      throw boom.notFound('Review Not Found');
    }

    return review;
  }

  async create(body) {
    const newReview = await models.Review.create(body);

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
