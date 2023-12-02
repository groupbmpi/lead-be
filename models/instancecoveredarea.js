const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

const Instance = require('./instance');
const City = require('./city');

const InstanceCoveredArea = db.define('InstanceCoveredArea', 
  {
    instance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'instances',
        key: 'instance_id'
      }
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cities',
        key: 'city_id'
      }
    }
  }, {
    sequelize,
    modelName: 'InstanceCoveredArea',
    tableName: 'instance_covered_areas',
    timestamps: false
  });

InstanceCoveredArea.belongsTo(Instance, { foreignKey: 'instance_id' });
InstanceCoveredArea.belongsTo(City, { foreignKey: 'city_id' });

Instance.hasMany(InstanceCoveredArea, { foreignKey: 'instance_id' });
City.hasMany(InstanceCoveredArea, { foreignKey: 'city_id' });

  export default InstanceCoveredArea;