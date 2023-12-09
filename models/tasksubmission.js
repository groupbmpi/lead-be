const { DataTypes } = require('sequelize');
const { Database } = require('../config/db');
const Participant = require('./participant');
const Task = require('./task');

const db = Database.getInstance().getSequelizeInstance();

const TaskSubmission = db.define('TaskSubmission', {
  submission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: 'task_id',
    },
  },
  participant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Participant,
      key: 'participant_id',
    },
  },
  submission_url: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('SUBMITTED','NOT SUBMITTED','SUBMITTED LATE'), 
    allowNull: false,
  },
  submission_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'TaskSubmission',
  tableName: 'task_submission',
  underscored: true,
  timestamps: false,
});

TaskSubmission.belongsTo(Task, { foreignKey: 'task_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
TaskSubmission.belongsTo(Participant, { foreignKey: 'participant_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

module.exports = TaskSubmission;