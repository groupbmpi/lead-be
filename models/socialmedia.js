
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Instances = require('./instances');

const SocialMedia = db.define('SocialMedia', {
  social_media_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  instances_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Instances,
      key: 'instances_id'
    },
  },
  platform: {
    type: DataTypes.ENUM('Instagram', 'Social Website', 'Tiktok', 'YouTube'),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'social_media',
  engine: 'InnoDB',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

SocialMedia.belongsTo(Instances, { foreignKey: 'instances_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Instances.hasMany(SocialMedia, { foreignKey: 'instances_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

module.exports = SocialMedia;
