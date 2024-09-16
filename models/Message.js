const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../db'); // Correctly import sequelize
const User = require('./User'); // Ensure this path points to the User model
const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: { // Keep camelCase
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: { // Keep camelCase
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Define associations
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Export the model
module.exports = Message;