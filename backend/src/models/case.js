// models/case.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Assuming the User model is defined

const Case = sequelize.define('Case', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false,
  },
}, {
  tableName: 'cases',
  timestamps: true,
});

Case.belongsTo(User, { foreignKey: 'user_id' }); // Define relationship
module.exports = Case;
