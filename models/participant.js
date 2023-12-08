const { Model, DataTypes } = require('sequelize');
const { Database } = require('../config/db');

const db = Database.getInstance().getSequelizeInstance();

const Instance = require('./instance');

const Participant = db.define('Participant', {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    instance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Instance,
        key: 'instance_id'
      }
    },
    participant_number: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.ENUM('Ketua Instansi', 'Wakil Ketua Instansi', 'Bendahara', 'Sekretaris', 'Ketua Divisi Program', 'Ketua Divisi Riset dan Komunikasi', 'Anggota'),
      allowNull: false
    },
    latest_education: {
      type: DataTypes.ENUM('SD/Sederajat', 'SMP/Sederajat', 'SMA/Sederajat', 'D3', 'Tidak Selesai S1', 'D4/S1', 'S2', 'S3'),
      allowNull: false
    },
    education_background: {
      type: DataTypes.STRING,
      allowNull: false
    },
    focus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whatsapp_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isNumeric: true,
        isPhoneNumber(value) {
          if (/^(62|0)\d*$/.test(value)) {
            throw new Error('Phone number is not valid');
          }
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email is not valid',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    joining_reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url_id_card: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    url_cv: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    confirmation_1: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false
    },
    confirmation_2: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false
    },
    confirmation_3: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false
    }, 
    role: {
      type: DataTypes.ENUM('PARTICIPANT'),
      defaultValue: 'PARTICIPANT',
      allowNull: false
    }
  }, {
    sequelize: db,
    modelName: 'Participant',
    tableName: 'participants',
    underscored: true,
    timestamps: false
  });

Participant.belongsTo(Instance, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Instance.hasMany(Participant, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Participant;