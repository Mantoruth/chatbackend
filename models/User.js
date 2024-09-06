const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ensure this path is correct

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name cannot be null
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty.', // Custom error message
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Email cannot be null
    unique: {
      msg: 'Email must be unique.', // Custom error message for uniqueness
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address.', // Custom error message for email format
      },
      notEmpty: {
        msg: 'Email cannot be empty.', // Custom error message
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Password cannot be null
    validate: {
      len: {
        args: [8, 100], // Password must be between 8 and 100 characters
        msg: 'Password must be between 8 and 100 characters long.', // Custom error message
      },
      notEmpty: {
        msg: 'Password cannot be empty.', // Custom error message
      },
    },
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default value for online status
  },
}, {
  // Model options
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  tableName: 'Users', // Explicitly define the table name
});

// Export the User model for use in other modules
module.exports = User;