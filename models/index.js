const Sequelize = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize('sqlite::memory:');

// Import models
const Loan = require('./loan');
const User = require('./user');
const Bill = require('./bill');

// Define associations
User.hasMany(Loan, { foreignKey: 'user_id' });
Loan.belongsTo(User, { foreignKey: 'user_id' });
Bill.belongsTo(User, { foreignKey: 'user_id' });

// Sync models with the database
sequelize.sync();

// Export models
module.exports = {
  Loan,
  User,
  Bill,
};
