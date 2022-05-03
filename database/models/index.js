const { User, UserSchema } = require('./user.model');
const { Hotel, HotelSchema } = require('./hotel.model');
const { Review, ReviewSchema } = require('./review.model');
const { UserHotel, UserHotelSchema } = require('./user-hotel.model');
const { UserReview, UserReviewSchema } = require('./user-review.model');
const { HotelReview, HotelReviewSchema } = require('./hotel-review.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Hotel.init(HotelSchema, Hotel.config(sequelize));
  Review.init(ReviewSchema, Review.config(sequelize));
  UserHotel.init(UserHotelSchema, UserHotel.config(sequelize));
  UserReview.init(UserReviewSchema, UserReview.config(sequelize));
  HotelReview.init(HotelReviewSchema, HotelReview.config(sequelize));
  User.associate(sequelize.models);
  Hotel.associate(sequelize.models);
  Review.associate(sequelize.models);
  // UserHotel.associate(sequelize.models);
  UserReview.associate(sequelize.models);
  HotelReview.associate(sequelize.models);
}

module.exports = setupModels;
