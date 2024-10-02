// models/file.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Case = require('./case');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  case_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Case,
      key: 'id',
    },
  },
  file_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'files',
  timestamps: true,
});

File.belongsTo(Case, { foreignKey: 'case_id' });
module.exports = File;
