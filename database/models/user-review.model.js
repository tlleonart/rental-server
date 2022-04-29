const { DataTypes, Model } = require("sequelize");

const { REVIEW_TABLE } = require("./review.model");
const { USER_TABLE } = require("./user.model");

const USER_REVIEW_TABLE = "user_review";

const UserReviewSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    field: "user_id",
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
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
};

class UserReview extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_REVIEW_TABLE,
      modelName: "UserReview",
      timestamps: false,
    };
  }
}

module.exports = { UserReview, USER_REVIEW_TABLE, UserReviewSchema };
