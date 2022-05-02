const { Model, DataTypes, Sequelize } = require('sequelize');

const REVIEW_TABLE = 'reviews';

const ReviewSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  score: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
};

class Review extends Model {
  static associate(models) {
    this.belongsToMany(models.Hotel, {
      as: 'hotels',
      through: models.HotelReview,
      foreignKey: 'reviewId',
      otherKey: 'hotelId',
    });
    this.belongsToMany(models.User, {
      as: 'users',
      through: models.UserReview,
      foreignKey: 'reviewId',
      otherKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REVIEW_TABLE,
      modelName: 'Review',
      timestamps: false,
    };
  }
}

module.exports = { REVIEW_TABLE, ReviewSchema, Review };
