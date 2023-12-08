const { DataTypes } = require('sequelize');
const { Database } = require('../config/db');

const db = Database.getInstance().getSequelizeInstance();

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
      // 3.1.a Dibuat terbatas hanya untuk email domain @bcf.or.id 
      isBCFEmail(value) {
        if (!value.endsWith('@bcf.or.id')) {
          throw new Error('Invalid email');
        }
      }, 
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
