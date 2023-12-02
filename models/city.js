
const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

const City = db.define('City', {
  city_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  province_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'City',
  tableName: 'cities',
  underscored: true,
});

export default City;