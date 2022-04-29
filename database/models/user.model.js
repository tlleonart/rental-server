const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
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
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  birthDate: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isBanned: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  repeatPassword: {
    allowNull: false,
    type: DataTypes.STRING
  }
  profilePic: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
  },
  isDeleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Hotel, {
      as: 'hotels',
      through: models.UserHotel,
      foreignKey: 'userId',
      otherKey: 'hotelId',
    });
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
