const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

const TaskSubmission = db.define('TaskSubmission', {
    submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mentor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Mentor',
        key: 'mentor_id'
      }
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Participant',
        key: 'participant_id'
      }
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Task',
        key: 'task_id'
      }
    },
    url_submission: {
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
    }
  }, {
    sequelize,
    modelName: 'TaskSubmission',
    tableName: 'task_submission',
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });

TaskSubmission.belongsTo(Mentor, { foreignKey: 'mentor_id' });
TaskSubmission.belongsTo(Participant, { foreignKey: 'participant_id' });
TaskSubmission.belongsTo(Task, { foreignKey: 'task_id' });

Mentor.hasMany(TaskSubmission, { foreignKey: 'mentor_id' });
Participant.hasMany(TaskSubmission, { foreignKey: 'participant_id' });
Task.hasMany(TaskSubmission, { foreignKey: 'task_id' });

export default TaskSubmission;