const Sequelize = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio', {
  totalValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

module.exports = Portfolio;
