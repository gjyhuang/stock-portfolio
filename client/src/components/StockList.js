import React from 'react';
import StockRow from './StockRow';
import TransactionRow from './TransactionRow';

// this will render stocks for both the portfolio and the transactions. the mapped stock array and one column header changes depending on which one; both default to portfolio data because that is always initially loaded

const StockList = ({portfolio, transactions, isTransactionsPage}) => {
  const stocks = portfolio ? portfolio.stocks : transactions.transactions;

  let valueOrDate = "Value Per Share ($)";
  valueOrDate = isTransactionsPage ? "Date" : "Value Per Share ($)";
  let itemList = stocks.map(stock => <StockRow key={stock.id} {...stock} />)

  itemList = isTransactionsPage ? stocks.map(stock => <TransactionRow key={stock.id} {...stock} />) : stocks.map(stock => <StockRow key={stock.id} {...stock} />)

  if (!portfolio && !transactions) return null;

  return (
    <div className="stock-list padding-20">
      <div className="stock-list top-row">
        <ul>
          <li>Symbol</li>
          <li>Company</li>
          <li>Qty</li>
          <li>{valueOrDate}</li>
          <li>Total Value ($)</li>
        </ul>
      </div>
      {itemList}
    </div>
  )
}

export default StockList;
