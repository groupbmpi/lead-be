const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Admin = db.define('Admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    validate: {
      isInt: true,
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'SUPERADMIN'),
    allowNull: false,
    defaultValue: 'ADMIN',
  },
}, {
  tableName: 'admins',
  underscored: true,
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

module.exports = Admin;
