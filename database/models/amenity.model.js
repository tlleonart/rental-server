const { Model, DataTypes, Sequelize } = require('sequelize');

const AMENITY_TABLE = 'amenities';

const AmenitySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Amenity extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: AMENITY_TABLE,
      modelName: 'Amenity',
      timestamps: false,
    };
  }
}

module.exports = { AMENITY_TABLE, AmenitySchema, Amenity };
