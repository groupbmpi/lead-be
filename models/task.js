const { Model, DataTypes } = require('sequelize');
const { db } = require('../config/db');
const Mentor = require('./mentor');

const Task = db.define('Task', {
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  mentor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mentor,
      key: 'mentor_id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Task',
  tableName: 'tasks',
  underscored: true,
  timestamps: false,
});

Task.belongsTo(Mentor, { foreignKey: 'mentor_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Mentor.hasMany(Task, { foreignKey: 'mentor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Task;