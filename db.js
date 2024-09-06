const { Sequelize } = require('sequelize');

// Database configuration
const database = 'chatapp';
const username = 'root'; // Update with your database username
const password = ''; // Update with your database password
const host = 'localhost'; // Database host

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql', // Change as needed (e.g., 'postgres', 'sqlite', etc.)
  logging: console.log, // Enable logging for all queries
});

// Test the connection to the database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Execute the connection test
testConnection();

// Export the sequelize instance for use in other modules
module.exports = sequelize; // Only export the sequelize instance