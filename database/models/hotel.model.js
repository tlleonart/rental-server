const { Model, DataTypes, Sequelize } = require('sequelize');

const HOTEL_TABLE = 'hotels';

const HotelSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  stars: {
    allowNull: false,
    type: DataTypes.ENUM ('1', '2', '3', '4', '5'),
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  latitude: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  longitude: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  children: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "We don't have an email",
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  web: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "We don't have a website"
  },
  image: {
    allowNull: false,
    type: DataTypes.ARRAY (DataTypes.JSON),
    defaultValue: ['https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/hotel.png'],
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isDeleted: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Hotel extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: HOTEL_TABLE,
      modelName: 'Hotel',
      timestamps: false,
    };
  }
}

module.exports = { HOTEL_TABLE, Hotel, HotelSchema };
