const Sequelize = require('sequelize');
const db = require('../db');

const TransactionHistory = db.define('transactionHistory', {
  totalPurchaseValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

module.exports = TransactionHistory;
