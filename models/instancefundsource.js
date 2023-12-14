const { Model, DataTypes } = require('sequelize');
const { Database } = require('./../config/db');

const Instance = require('./instance');
const FundSource =  require('./fundsource');

const db = Database.getInstance().getSequelizeInstance();

const InstanceFundSource = db.define('InstanceFundSource',{
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
    sequelize: db,
    modelName: 'InstanceFundSource',
    tableName: 'instance_fund_sources',
    timestamps: false,
    underscored: true,
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

InstanceFundSource.belongsTo(Instance, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InstanceFundSource.belongsTo(FundSource, { foreignKey: 'fund_source_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Instance.hasMany(InstanceFundSource, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
FundSource.hasMany(InstanceFundSource, { foreignKey: 'fund_source_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = InstanceFundSource;