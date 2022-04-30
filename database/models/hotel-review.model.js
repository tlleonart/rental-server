const { DataTypes, Model } = require('sequelize');

const { HOTEL_TABLE } = require('./hotel.model');
const { REVIEW_TABLE } = require('./review.model');

const HOTEL_REVIEW_TABLE = 'hotel_review';

const HotelReviewSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  reviewId: {
    allowNull: false,
    field: 'review_id',
    type: DataTypes.INTEGER,
    references: {
      model: REVIEW_TABLE,
      key: 'id',
    },
  },
  hotelId: {
    allowNull: false,
    field: 'hotel_id',
    type: DataTypes.INTEGER,
    references: {
      model: HOTEL_TABLE,
      key: 'id',
    },
  },
};

class HotelReview extends Model {
  static associate(models) {
    this.belongsTo(models.Hotel, {
      as: 'hotels',
      foreignKey: 'hotelReviewId',
      otherKey: 'hotelId',
    });
    this.belongsTo(models.Review, {
      as: 'reviews',
      foreignKey: 'hotelReviewId',
      otherKey: 'reviewId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HOTEL_REVIEW_TABLE,
      modelName: 'HotelReview',
      timestamps: false,
    };
  }
}

module.exports = { HotelReview, HOTEL_REVIEW_TABLE, HotelReviewSchema };
