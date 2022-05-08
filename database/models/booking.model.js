const { Model, DataTypes, Sequelize } = require('sequelize');

const BOOKING_TABLE = 'bookings';

const BookingSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nights: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pricePerNight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Booking extends Model {
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
    this.hasOne(models.Billing);
    this.hasOne(models.Review);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOKING_TABLE,
      modelName: 'Booking',
      timestamps: false,
    };
  }
}

module.exports = { BOOKING_TABLE, BookingSchema, Booking };
