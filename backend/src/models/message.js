const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Assuming the User model is defined
const Case = require('./case'); // Assuming the Case model is defined

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure sender_id cannot be null
    references: {
      model: User,
      key: 'id',
    },
  },
  case_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure case_id cannot be null
    references: {
      model: Case,
      key: 'id',
    },
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Sets the default to the current date and time
  },
}, {
  tableName: 'messages',
  timestamps: false, // Disable automatic timestamps since we're handling 'sent_at'
  indexes: [
    {
      unique: true,
      fields: ['sender_id', 'case_id'] // Optional unique constraint
    }
  ]
});

Message.belongsTo(User, { foreignKey: 'sender_id' });
Message.belongsTo(Case, { foreignKey: 'case_id' });

module.exports = Message;
