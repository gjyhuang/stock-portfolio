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
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  firstUpdate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latestUpdate: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Stock;
