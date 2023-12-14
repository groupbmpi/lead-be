const { Model, DataTypes } = require('sequelize');
const { Database } = require('./../config/db');
const Participant = require('./participant');
const Mentor = require('./mentor');

const db = Database.getInstance().getSequelizeInstance();

const ParticipantsMentors = db.define('ParticipantsMentors', {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Participant,
        key: 'participant_id'
      }
    },
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Mentor,
        key: 'mentor_id'
      }
    }
  }, {
    sequelize: db,
    modelName: 'ParticipantsMentors',
    tableName: 'participants_mentors',
    underscored: true,
    timestamps: false
  });

ParticipantsMentors.belongsTo(Participant, { foreignKey: 'participant_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ParticipantsMentors.belongsTo(Mentor, { foreignKey: 'mentor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Participant.hasMany(ParticipantsMentors, { foreignKey: 'participant_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Mentor.hasMany(ParticipantsMentors, { foreignKey: 'mentor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = ParticipantsMentors;