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

ParticipantsMentors.belongsTo(Participant, { foreignKey: 'participant_id' });
ParticipantsMentors.belongsTo(Mentor, { foreignKey: 'mentor_id' });

Participant.hasMany(ParticipantsMentors, { foreignKey: 'participant_id' });
Mentor.hasMany(ParticipantsMentors, { foreignKey: 'mentor_id' });

export default ParticipantsMentors;