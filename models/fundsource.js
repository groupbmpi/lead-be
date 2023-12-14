const { Model, DataTypes } = require('sequelize');
const { Database } = require('./../config/db');

const db = Database.getInstance().getSequelizeInstance();


const FundSource = db.define('FundSource', {
  fund_source_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'FundSource',
  tableName: 'fund_sources',
  underscored: true,
  timestamps: false
});

module.exports = FundSource;