const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');
const Mentor = db.define('Mentor', {
    mentor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false,
      },
    },
    category: {
      type: DataTypes.ENUM('Desain Program', 'Cluster'),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('Pria', 'Wanita'),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    education_background: {
      type: DataTypes.ENUM('S1', 'S2', 'S3'),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    current_workplace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url_picture: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    role: {
      type: DataTypes.ENUM('MENTOR'), // untuk JWT claim token
      defaultValue: 'MENTOR',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Mentor',
    tableName: 'mentors',
    underscored: true,
    timestamps: false
  });

  export default Mentor;