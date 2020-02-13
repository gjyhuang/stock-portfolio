const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');

Portfolio.belongsTo(User);
User.hasOne(Portfolio);

Portfolio.hasMany(Stock);

module.exports = {
  User,
  Portfolio,
  Stock
};
