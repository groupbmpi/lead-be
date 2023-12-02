const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');


const SustainableDevelopmentGoal = db.define('SustainableDevelopmentGoal', {
    sdg_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SustainableDevelopmentGoal',
    tableName: 'sustainable_development_goals',
    underscored: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });
  
export default SustainableDevelopmentGoal;