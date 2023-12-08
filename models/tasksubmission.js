const { Model, DataTypes } = require('sequelize');
const { Database } = require('../config/db');
const Participant = require('./participant');
const Task = require('./task');

const db = Database.getInstance().getSequelizeInstance();

const TaskSubmission = db.define('TaskSubmission', {
    submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: 'task_id'
      }
    },
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Participant,
        key: 'participant_id'
      }
    },
    submissionUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('SUBMITTED', 'NOT SUBMITTED', 'SUBMITTED LATE'),
      allowNull: false,
      defaultValue: 'NOT SUBMITTED'
    },
    submissionTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize: db,
    modelName: 'TaskSubmission',
    tableName: 'task_submission',
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci',
    timestamps: false
  });

TaskSubmission.belongsTo(Participant, { foreignKey: 'participant_id',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });
TaskSubmission.belongsTo(Task, { foreignKey: 'task_id',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Participant.hasMany(TaskSubmission, { foreignKey: 'participant_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Task.hasMany(TaskSubmission, { foreignKey: 'task_id',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = TaskSubmission;