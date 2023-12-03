
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Instance = require('./instance');
const City = require('./city');
const Province = require('./province');

const Address = db.define('Address', {
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    instance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Instance,
            key: 'instance_id',
        },
    },
    address_street: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    address_village: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    address_district: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    address_city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: 'city_id',
        },
    },
    address_province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Province,
            key: 'province_id',
        },
    },
    address_postal_code: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'addresses',
    timestamps: false
});

// Associations
Address.belongsTo(Instance, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Address.belongsTo(City, { foreignKey: 'address_city_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Address.belongsTo(Province, { foreignKey: 'address_province_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Instance.hasMany(Address, { foreignKey: 'instance_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
City.hasMany(Address, { foreignKey: 'address_city_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Province.hasMany(Address, { foreignKey: 'address_province_id',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Address;
