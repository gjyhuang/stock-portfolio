const Sequelize = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio', {
  totalCash: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 500000
  },
});

module.exports = Portfolio;
