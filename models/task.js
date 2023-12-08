const { DataTypes } = require('sequelize');
const { Database } = require('../config/db');
const Mentor = require('./mentor');

const db = Database.getInstance().getSequelizeInstance();

const Task = db.define('Task', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: 'mentor_id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
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
    sequelize: db,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
    timestamps: false
  });

Task.belongsTo(Mentor, { foreignKey: 'mentor_id' });
Mentor.hasMany(Task, { foreignKey: 'mentor_id' });

module.exports = Task;