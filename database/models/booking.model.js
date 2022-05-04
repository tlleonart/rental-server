const { Model, DataTypes, Sequelize } = require('sequelize');

const BOOKING_TABLE = 'bookings';

const BookingSchema = {
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
};

class Booking extends Model {
  static associate() {}

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
