const { Model, DataTypes, Sequelize } = require('sequelize');

const CITY_TABLE = 'cities';

const CitySchema = {
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

class City extends Model {
  static associate(models) {
    this.belongsTo(models.Country, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.hasMany(models.Hotel);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CITY_TABLE,
      modelName: 'City',
      timestamps: false,
    };
  }
}

module.exports = { CITY_TABLE, City, CitySchema };
