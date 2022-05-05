const { User, UserSchema } = require('./user.model');
const { Hotel, HotelSchema } = require('./hotel.model');
const { Review, ReviewSchema } = require('./review.model');
const { Suscriptor, SuscriptorSchema } = require('./suscriptor.model');
const { Booking, BookingSchema } = require('./booking.model');
const { Facility, FacilitySchema } = require('./facility.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Hotel.init(HotelSchema, Hotel.config(sequelize));
  Review.init(ReviewSchema, Review.config(sequelize));
  Suscriptor.init(SuscriptorSchema, Suscriptor.config(sequelize));
  Booking.init(BookingSchema, Booking.config(sequelize));
  Facility.init(FacilitySchema, Facility.config(sequelize));
}

module.exports = setupModels;
