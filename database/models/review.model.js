const { Model, DataTypes, Sequelize } = require('sequelize');

const REVIEW_TABLE = 'reviews';

const ReviewSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  score: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  priceQualityRatio: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  facilities: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  location: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  cleaning: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  attentionService: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  comfortable: {
    allowNull: false,
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
  },
  stayedOn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Review extends Model {
  static associate() {}

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
