const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
});

module.exports = Stock;
