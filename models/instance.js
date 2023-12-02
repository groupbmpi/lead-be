const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');
const Province = require('./province');
const City = require('./city');

const Instance = db.define('Instance', {
  instance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    references: {
      model: City,
      key: 'city_id'
    }
  },
  address_province: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Province,
      key: 'province_id'
    }
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
    collate: 'utf8mb4_0900_ai_ci'
  },
}, {
  sequelize: db,
  modelName: 'Instance',
  tableName: 'instances',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

Instance.belongsTo(City, { foreignKey: 'address_regency' });
Instance.belongsTo(Province, { foreignKey: 'address_province' });

City.hasMany(Instance, { foreignKey: 'address_regency' });
Province.hasMany(Instance, { foreignKey: 'address_province' });

export default Instance;