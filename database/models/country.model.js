const { Model, DataTypes, Sequelize } = require('sequelize');

const COUNTRY_TABLE = 'countries';

const CountrySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Country extends Model {
  static associate(models) {
    this.hasMany(models.City);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COUNTRY_TABLE,
      modelName: 'Country',
      timestamps: false,
    };
  }
}

module.exports = { COUNTRY_TABLE, Country, CountrySchema };
