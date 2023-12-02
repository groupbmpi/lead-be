const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

const Participant = db.define('Participant', {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    instance_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        isEmail: true,
        isEmpty: false,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmpty: false,
        isPassword(value) {
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
            throw new Error('Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number');
          }
        }
      },
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
    sequelize,
    modelName: 'Participant',
    tableName: 'participants',
    underscored: true,
  });

  export default Participant;