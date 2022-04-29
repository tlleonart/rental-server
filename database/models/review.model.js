const { Model, DataTypes, Sequelize } = require("sequelize");

const REVIEW_TABLE = "reviews";

const ReviewSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
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
  stars: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "3*",
  },
};

class Review extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: REVIEW_TABLE,
      modelName: "Review",
      timestamps: false,
    };
  }
}

module.exports = { REVIEW_TABLE, ReviewSchema, Review };
