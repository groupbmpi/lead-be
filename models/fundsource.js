const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');


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

export default FundSource;