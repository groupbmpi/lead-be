const { Model, DataTypes } = require('sequelize');
const { Database } = require('./../config/db');

const db = Database.getInstance().getSequelizeInstance();

const Beneficiary = db.define('Beneficiary', {
  beneficiary_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    validate: {
      isInt: true,
      isEmpty: false,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'beneficiaries',
  underscored: true,
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

module.exports = Beneficiary;
