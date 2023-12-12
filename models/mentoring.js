const { DataTypes } = require('sequelize');
const { Database } = require('../config/db');
const Mentor = require('./mentor');
const Participant = require('./participant');

const db = Database.getInstance().getSequelizeInstance();

const Mentoring = db.define('Mentoring', {
    mentoring_id: {
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
    participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Participant,
            key: 'participant_id',
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
    datetime_start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    datetime_finish: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    url_meet: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'Mentoring',
    tableName: 'mentorings',
    underscored: true,
    timestamps: false,
});

Mentoring.belongsTo(Mentor, { foreignKey: 'mentor_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Mentor.hasMany(Mentoring, { foreignKey: 'mentor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Mentoring.belongsTo(Participant, { foreignKey: 'participant_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Participant.hasMany(Mentoring, { foreignKey: 'participant_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Mentoring;
