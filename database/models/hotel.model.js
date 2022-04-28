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
    type: DataTypes.INTEGER,
  },
  ranking: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  countryCode: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  latitude: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  longitude: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
    type: DataTypes.DECIMAL,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phones: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  children: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  maxPax: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  gallery: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
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
