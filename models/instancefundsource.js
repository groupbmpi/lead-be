const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

import Instance from './instance';
import FundSource from './fundsource';

const InstanceCoveredArea = db.define('InstanceCoveredArea',{
    instance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'instances',
        key: 'instance_id'
      }
    },
    fund_source_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'fund_sources',
        key: 'fund_source_id'
      }
    }
  }, {
    sequelize,
    modelName: 'InstanceFundSource',
    tableName: 'instance_fund_sources',
    underscored: true,
    timestamps: false,
    indexes: [
      {
        name: 'instance_id',
        fields: ['instance_id']
      },
      {
        name: 'fund_source_id',
        fields: ['fund_source_id']
      }
    ],
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });

InstanceCoveredArea.belongsTo(Instance, { foreignKey: 'instance_id' });
InstanceCoveredArea.belongsTo(FundSource, { foreignKey: 'fund_source_id' });

Instance.hasMany(InstanceCoveredArea, { foreignKey: 'instance_id' });
FundSource.hasMany(InstanceCoveredArea, { foreignKey: 'fund_source_id' });

export default InstanceCoveredArea;