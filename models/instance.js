const { Model, DataTypes } = require('sequelize');
const { Database } = require('../config/db');
const City = require('./city');
const Province = require('./province');

const db = Database.getInstance().getSequelizeInstance();

const Instance = db.define('Instance', {
  instance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Gerakan', 'Komunitas', 'Yayasan'),
    allowNull: false,
    defaultValue: 'Gerakan'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sector: {
    type: DataTypes.ENUM('Kesehatan', 'Pendidikan', 'Lingkungan'),
    allowNull: false
  },
  focus: {
    type: DataTypes.ENUM('Eliminasi TBC', 'Stunting', 'Malaria', 'HIV', 'Kesehatan - Lainnya', 'Pendidikan Anak Prasejahtera', 'Gerakan Lanjut Kuliah', 'Pendidikan - Lainnya', 'Emisi Karbon', 'Energi Baru Terbarukan', 'Pengelolaan Sampah Plastik', 'Air Bersih dan Sanitasi Layak', 'Manajemen Ekosistem Laut dan Darat', 'Lingkungan - Lainnya'),
    allowNull: false
  },
  established_month: {
    type: DataTypes.ENUM('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'),
    allowNull: false
  },
  established_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  area: {
    type: DataTypes.ENUM('Nasional', 'Lebih dari Satu Provinsi', 'Hanya Satu Provinsi', 'Kota/Kabupaten', 'Kecamatan/Kelurahan/Lingkup Lebih Kecil'),
    allowNull: false
  },
  total_beneficiaries: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address_street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_village: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_regency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  address_province: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address_postal_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_company_profile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_program_proposal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  social_instagram: {
    type: DataTypes.STRING,
    allowNull: true
  },
  social_website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  social_tiktok: {
    type: DataTypes.STRING,
    allowNull: true
  },
  social_youtube: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Menunggu', 'Ditolak', 'Wawancara', 'Lolos'),
    allowNull: false,
    defaultValue: 'Menunggu',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci',
  },
}, {
  sequelize: db,
  modelName: 'Instance',
  tableName: 'instances',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
  timestamps: false,
  foreignKeys: [
    {
      name: 'instances_ibfk_1',
      field: 'address_regency',
      references: {
        model: City,
        table: 'cities',
        field: 'city_id'
      }
    },
    {
      name: 'instances_ibfk_2',
      field: 'address_province',
      references: {
        model: Province,
        table: 'provinces',
        field: 'province_id'
      }
    }
  ]
});

Instance.belongsTo(City, { foreignKey: 'address_regency', as: 'regency' });
Instance.belongsTo(Province, { foreignKey: 'address_province', as: 'province' });


module.exports = Instance;