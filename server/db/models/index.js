const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const TransactionHistory = require('./transactionHistory');
const Transaction = require('./transaction')

// each user has one portfolio
// put the foreign key (portfolio, history) on the user table
User.Portfolio = User.belongsTo(Portfolio);
User.belongsTo(Portfolio);
User.belongsTo(TransactionHistory);

// each stock is unique and belongs to one portfolio
// put the foreign key (portfolio) on the stock table
Portfolio.Stock = Portfolio.hasMany(Stock);
Portfolio.hasMany(Stock);

// each transaction is unique and belongs to one portfolio
// put the foreign key (single transaction) on the history table
// put the foreign key (history) on the user table
TransactionHistory.hasMany(Transaction);

module.exports = {
  User,
  Portfolio,
  Stock,
  TransactionHistory,
  Transaction
};
