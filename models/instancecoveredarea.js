const { Model, DataTypes } = require('sequelize');
const { Database } = require('../config/db');

const Instance = require('./instance');
const City = require('./city');

const db = Database.getInstance().getSequelizeInstance();

const InstanceCoveredArea = db.define('InstanceCoveredArea', 
  {
    instance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Instance,
        key: 'instance_id'
      }
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: City,
        key: 'city_id'
      }
    }
  }, {
    sequelize: db,
    modelName: 'InstanceCoveredArea',
    tableName: 'instance_covered_areas',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['instance_id', 'city_id']
      }
    ]
  });

InstanceCoveredArea.belongsTo(Instance, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InstanceCoveredArea.belongsTo(City, { foreignKey: 'city_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Instance.hasMany(InstanceCoveredArea, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
City.hasMany(InstanceCoveredArea, { foreignKey: 'city_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = InstanceCoveredArea;