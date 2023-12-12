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
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Gerakan', 'Komunitas', 'Yayasan'),
    allowNull: false,
    defaultValue: 'Gerakan',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  batch: {
    type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
    allowNull: false,
    defaultValue: '6',
  },
  sector: {
    type: DataTypes.ENUM('Kesehatan', 'Pendidikan', 'Lingkungan'),
    allowNull: false,
  },
  focus: {
    type: DataTypes.ENUM(
      'Eliminasi TBC',
      'Stunting',
      'Malaria',
      'HIV',
      'Kesehatan - Lainnya',
      'Pendidikan Anak Prasejahtera',
      'Gerakan Lanjut Kuliah',
      'Pendidikan - Lainnya',
      'Emisi Karbon',
      'Energi Baru Terbarukan',
      'Pengelolaan Sampah Plastik',
      'Air Bersih dan Sanitasi Layak',
      'Manajemen Ekosistem Laut dan Darat',
      'Lingkungan - Lainnya'
    ),
    allowNull: false,
  },
  established_month: {
    type: DataTypes.ENUM(
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ),
    allowNull: false,
  },
  established_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  area: {
    type: DataTypes.ENUM(
      'Nasional',
      'Lebih dari Satu Provinsi',
      'Hanya Satu Provinsi',
      'Kota/Kabupaten',
      'Kecamatan/Kelurahan/Lingkup Lebih Kecil'
    ),
    allowNull: false,
  },
  total_beneficiaries: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url_company_profile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_program_proposal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Menunggu', 'Ditolak', 'Wawancara', 'Lolos'),
    allowNull: false,
    defaultValue: 'Menunggu',
  },
  stable_fund_source: {
    type: DataTypes.ENUM('Ya', 'Tidak'),
    allowNull: true,
    defaultValue: null,
  },
  information_source: {
    type: DataTypes.ENUM(
      'Instagram @bakriecenter',
      'Website Bakrie Center Foundation (http://bcf.or.id/)',
      'Alumni LEAD Indonesia',
      'Dihubungi oleh tim Bakrie Center Foundation',
      'Teman atau rekan kerja'
    ),
    allowNull: false,
  },
  desain_program_training: {
    type: DataTypes.ENUM(
      'Belum pernah mengetahui',
      'Pernah mempelajari',
      'Learning by Doing di instansi saat ini',
      'Memahami betul dan menjadi praktisi dalam bidang desain program'
    ),
    allowNull: false,
  },
  desain_program_knowledge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sustainability_training: {
    type: DataTypes.ENUM(
      'Belum pernah mengetahui',
      'Pernah mempelajari',
      'Learning by Doing di instansi saat ini',
      'Memahami betul dan menjadi praktisi dalam bidang sustainability'
    ),
    allowNull: false,
  },
  sustainability_knowledge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  social_report_training: {
    type: DataTypes.ENUM(
      'Belum pernah mengetahui',
      'Pernah mempelajari',
      'Learning by Doing di instansi saat ini',
      'Memahami betul dan menjadi praktisi dalam bidang social report'
    ),
    allowNull: false,
  },
  social_report_knowledge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_program_report: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  expectation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  other_inquiries: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  social_instagram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  social_website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  social_tiktok: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  social_youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_village: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_regency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Instance',
  tableName: 'instances',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
  timestamps: false,
});

Instance.belongsTo(City, { foreignKey: 'address_regency', as: 'city' });
Instance.belongsTo(Province, { foreignKey: 'address_province', as: 'province' });

module.exports = Instance;
