const { Model, DataTypes } = require('sequelize');
const { Database } = require('./../config/db');

const db = Database.getInstance().getSequelizeInstance();

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
    sequelize: db,
    modelName: 'Province',
    tableName: 'provinces',
    underscored: true,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci',
    timestamps: false
  });
  
module.exports = Province;