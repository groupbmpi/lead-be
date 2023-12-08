const { DataTypes } = require('sequelize');
const { Database } = require('../config/db');


const db = Database.getInstance().getSequelizeInstance();
const InformationBanner = db.define('InformationBanner', {
  information_banner_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      isInt: true,
      notEmpty: true,
    },
  },
  url_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: 'InformationBanner',
  tableName: 'information_banners', 
  timestamps: false
});

module.exports = InformationBanner;
