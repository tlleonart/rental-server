const { Model, DataTypes, Sequelize } = require('sequelize');

const SUSCRIPTOR_TABLE = 'suscriptors';

const SuscriptorSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Suscriptor extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUSCRIPTOR_TABLE,
      modelName: 'Suscriptor',
      timestamps: false,
    };
  }
}

module.exports = { SUSCRIPTOR_TABLE, SuscriptorSchema, Suscriptor };
