const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'lawyer', 'mediator'),
    allowNull: false,
  },
}, {
  tableName: 'users', // Ensure this matches your table name
  timestamps: true, // Sequelize will add 'createdAt' and 'updatedAt' fields
});

module.exports = User;
