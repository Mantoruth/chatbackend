const { DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const { User } = require('./index');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference the User model
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  underscored: true, // Use snake_case for field names
  freezeTableName: true, // Don't pluralize table names
  tableName: 'messages' // Specify the table name
});

// Define the association (belongsTo)
Message.belongsTo(User, { foreignKey: 'userId' });

module.exports = Message;