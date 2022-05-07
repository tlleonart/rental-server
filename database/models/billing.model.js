const { Model, DataTypes, Sequelize } = require('sequelize');

const BILLING_TABLE = 'billings';

const BillingSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  otherCharges: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Billing extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.belongsTo(models.Hotel, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.belongsTo(models.Booking, {
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BILLING_TABLE,
      modelName: 'Billing',
      timestamps: false,
    };
  }
}

module.exports = { BILLING_TABLE, Billing, BillingSchema };
