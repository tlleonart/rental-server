const { User, UserSchema } = require('./user.model');
const { Hotel, HotelSchema } = require('./hotel.model');
const { UserHotel, UserHotelSchema } = require('./user-hotel.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Hotel.init(HotelSchema, Hotel.config(sequelize));
  UserHotel.init(UserHotelSchema, UserHotel.config(sequelize));

  User.associate(sequelize.models);
}

module.exports = setupModels;
