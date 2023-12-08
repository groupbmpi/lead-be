const { Model, DataTypes } = require('sequelize');
const { Database } = require('../config/db');

const db = Database.getInstance().getSequelizeInstance();

const Province = require('./province');

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
    allowNull: false,
    references: {
      model: Province,
      key: 'province_id',
    }
  }
}, {
  sequelize: db,
  modelName: 'City',
  tableName: 'cities',
  underscored: true,
  timestamps: false
});

City.belongsTo(Province, { foreignKey: 'province_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Province.hasMany(City, { foreignKey: 'province_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = City;