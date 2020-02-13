const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');

User.belongsTo(Portfolio);
Portfolio.hasOne(User);

Portfolio.hasMany(Stock);

module.exports = {
  User,
  Portfolio,
  Stock
};
