const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 0 }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 0 }
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Stock;
