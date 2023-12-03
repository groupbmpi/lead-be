const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');
const Participant = require('./participants');
const Mentor = require('./mentors');

const ParticipantsMentors = db.define('ParticipantsMentors', {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Participant',
        key: 'participant_id'
      }
    },
    mentor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Mentor',
        key: 'mentor_id'
      }
    }
  }, {
    sequelize,
    modelName: 'ParticipantsMentors',
    tableName: 'participants_mentors',
    underscored: true,
    timestamps: false
  });

ParticipantsMentors.belongsTo(Participant, { foreignKey: 'participant_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ParticipantsMentors.belongsTo(Mentor, { foreignKey: 'mentor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Participant.hasMany(ParticipantsMentors, { foreignKey: 'participant_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Mentor.hasMany(ParticipantsMentors, { foreignKey: 'mentor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default ParticipantsMentors;