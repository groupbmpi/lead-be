const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

const Task = db.define('Task', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
    timestamps: false
  });

export default Task;