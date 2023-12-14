
const { DataTypes } = require('sequelize');
const { Database } = require('./../config/db');
const Beneficiary = require('./beneficiary');
const Instance = require('./instance');

const db = Database.getInstance().getSequelizeInstance();

const InstanceBeneficiary = db.define('InstanceBeneficiary', {
    beneficiary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Beneficiary,
            key: 'beneficiary_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    instance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Instance,
            key: 'instance_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'instance_beneficiaries',
    timestamps: false
});

Beneficiary.hasMany(InstanceBeneficiary, {
    foreignKey: 'beneficiary_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Instance.hasMany(InstanceBeneficiary, {
    foreignKey: 'instance_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

InstanceBeneficiary.belongsTo(Beneficiary, {
    foreignKey: 'beneficiary_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

InstanceBeneficiary.belongsTo(Instance, {
    foreignKey: 'instance_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = InstanceBeneficiary;
