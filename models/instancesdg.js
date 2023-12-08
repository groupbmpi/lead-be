const { Model, DataTypes } = require('sequelize');
const { Database } = require('../config/db');
const Instance = require('./instance');
const Sdg = require('./sustainabledevelopmentgoal');

const db = Database.getInstance().getSequelizeInstance();

const InstanceSdg = db.define('InstanceSdg', {
    instance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Instance,
        key: 'instance_id'
      }
    },
    sdg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Sdg,
        key: 'sdg_id'
      }
    }
  }, {
    sequelize: db,
    modelName: 'InstanceSdg',
    tableName: 'instance_sdg',
    underscored: true,
    timestamps: false,
    indexes: [
      {
        name: 'instance_id',
        fields: ['instance_id']
      },
      {
        name: 'sdg_id',
        fields: ['sdg_id']
      }
    ],
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });

InstanceSdg.belongsTo(Instance, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InstanceSdg.belongsTo(Sdg, { foreignKey: 'sdg_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

Instance.hasMany(InstanceSdg, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Sdg.hasMany(InstanceSdg, { foreignKey: 'sdg_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = InstanceSdg;