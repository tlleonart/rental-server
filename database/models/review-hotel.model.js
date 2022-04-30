const { DataTypes, Model } = require("sequelize");

const { HOTEL_TABLE } = require("./hotel.model");
const { REVIEW_TABLE } = require("./review.model");

const REVIEW_HOTEL_TABLE = "review_hotel";

const ReviewHotelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  reviewId: {
    allowNull: false,
    field: "review_id",
    type: DataTypes.INTEGER,
    references: {
      model: REVIEW_TABLE,
      key: "id",
    },
  },
  hotelId: {
    allowNull: false,
    field: "hotel_id",
    type: DataTypes.INTEGER,
    references: {
      model: HOTEL_TABLE,
      key: "id",
    },
  },
};

class ReviewHotel extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: REVIEW_HOTEL_TABLE,
      modelName: "ReviewHotel",
      timestamps: false,
    };
  }
}

module.exports = { ReviewHotel, REVIEW_HOTEL_TABLE, ReviewHotelSchema };
