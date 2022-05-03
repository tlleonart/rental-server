const { DataTypes, Model } = require('sequelize');

const { HOTEL_TABLE } = require('./hotel.model');
const { USER_TABLE } = require('./user.model');

const USER_HOTEL_TABLE = 'user_hotel';

const UserHotelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
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

class UserHotel extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_HOTEL_TABLE,
      modelName: 'UserHotel',
      timestamps: false,

    };
  }
}

module.exports = { UserHotel, USER_HOTEL_TABLE, UserHotelSchema };
