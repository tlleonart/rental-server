const { Model, DataTypes, Sequelize } = require('sequelize');

const FACILITY_TABLE = 'facilities';

const FacilitySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Facility extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: FACILITY_TABLE,
      modelName: 'Facility',
      timestamps: false,
    };
  }
}

module.exports = { FACILITY_TABLE, FacilitySchema, Facility };
