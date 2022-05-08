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
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
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
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  children: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "We don't have an email",
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  web: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "We don't have a website",
  },
  mainImage: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/327308851.jpg?k=812d27fb80553a7a0231e05a076568937a18b87cb33ec7a3a1f3feb0cc89b4f1&o=&hp=1',
  },
  roomImage: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/111155493.jpg?k=112aa23f3de8bb180d37bf1380442dbb42daaef09b8c5279822d5df413d60b70&o=&hp=1'
    ,
  },
  barImage: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/111155847.jpg?k=15f4e83547e57e407eb13f95a491272b69854eb3412fb9ae839370198d7e9ffd&o=&hp=1'
    ,
  },
  amenitiesImage: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/111160486.jpg?k=49be336a9fdb24c9550c4d19cde31147bb475913525b907c612e6079e3e90445&o=&hp=1'
    ,
  },
  otherImage: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/111161887.jpg?k=f40f9e8069050aadccfca8f6c6de541ef2f3dda9a203ac0052290703d49fed98&o=&hp=1'
    ,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDeleted: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Hotel extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.belongsTo(models.City, {
      foreignKey: {
        allowNull: false,
      },
    });
    this.hasMany(models.Review);
    this.hasMany(models.Booking);
    this.hasMany(models.Billing);
  }

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
