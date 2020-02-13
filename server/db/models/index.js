const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');

Portfolio.belongsTo(User);
Portfolio.hasMany(Stock);

module.exports = {
  User,
  Portfolio,
  Stock
};
