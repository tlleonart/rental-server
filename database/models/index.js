const { User, UserSchema } = require('./user.model');
const { Hotel, HotelSchema } = require('./hotel.model');
const { Review, ReviewSchema } = require('./review.model');
const { Suscriptor, SuscriptorSchema } = require('./suscriptor.model');
const { Booking, BookingSchema } = require('./booking.model');
const { Facility, FacilitySchema } = require('./facility.model');
const { Billing, BillingSchema } = require('./billing.model');
const { Country, CountrySchema } = require('./country.model');
const { City, CitySchema } = require('./city.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Hotel.init(HotelSchema, Hotel.config(sequelize));
  Review.init(ReviewSchema, Review.config(sequelize));
  Suscriptor.init(SuscriptorSchema, Suscriptor.config(sequelize));
  Booking.init(BookingSchema, Booking.config(sequelize));
  Facility.init(FacilitySchema, Facility.config(sequelize));
  Billing.init(BillingSchema, Billing.config(sequelize));
  Country.init(CountrySchema, Country.config(sequelize));
  City.init(CitySchema, City.config(sequelize));
  User.associate(sequelize.models);
  Hotel.associate(sequelize.models);
  Review.associate(sequelize.models);
  Booking.associate(sequelize.models);
  Billing.associate(sequelize.models);
  Country.associate(sequelize.models);
  City.associate(sequelize.models);
}

module.exports = setupModels;
