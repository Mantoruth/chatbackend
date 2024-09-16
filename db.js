const { Sequelize } = require('sequelize');

// Database configuration
const database = process.env.DB_NAME || 'chatapp';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || 'localhost';

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  logging: console.log, // Log SQL queries to the console
});

// Test the connection to the database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Call the connection test function
testConnection();

// Export the sequelize instance
module.exports = { sequelize }; // Ensure this is an object