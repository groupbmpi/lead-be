const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

const Province = db.define('Province', {
    province_id: {
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
    sequelize,
    modelName: 'Province',
    tableName: 'provinces',
    underscored: true,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });
  
export default Province;