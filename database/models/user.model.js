const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  typePerson: {
    type: DataTypes.ENUM('natural', 'legal'),
    allowNull: false,
  },
  firstName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  organization: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  repeatPass: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM('admin', 'customer', 'owner'),
    defaultValue: 'customer',
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
  },
  favHotels: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  isSubscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  isBanned: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Hotel);
    this.hasMany(models.Review);
    this.hasMany(models.Booking);
    this.hasMany(models.Billing);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
