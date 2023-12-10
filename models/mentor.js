const { DataTypes } = require('sequelize');
const { Database } = require('../config/db');

const db = Database.getInstance().getSequelizeInstance();

const Mentor = db.define('Mentor', {
  mentor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: DataTypes.ENUM('Desain Program', 'Cluster'),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Pria', 'Wanita'),
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  education_background: {
    type: DataTypes.ENUM('S1', 'S2', 'S3'),
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  current_workplace: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('MENTOR'),
    defaultValue: 'MENTOR',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Mentor',
  tableName: 'mentors',
  underscored: true,
  timestamps: false,
});

module.exports = Mentor;
