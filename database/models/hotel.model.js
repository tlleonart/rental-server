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
    type: DataTypes.STRING,
    defaultValue: '3*',
  },
  ranking: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  countryCode: {
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
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  postalCode: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "We don't have an email",
  },
  phones: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  children: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  maxPax: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  gallery: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  isDeleted: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
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
