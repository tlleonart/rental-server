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
    type: DataTypes.INTEGER,
  },
  priceQualityRatio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  facilities: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  location: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  cleaning: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  attentionService: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  comfortable: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stayedOn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Review extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.belongsTo(models.Hotel, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.belongsTo(models.Booking, {
      foreignKey: {
        allowNull: false,
      },
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
