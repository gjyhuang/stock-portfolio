import React from 'react';
import StockRow from './StockRow';
import TransactionRow from './TransactionRow';

// this will render stocks for both the portfolio and the transactions. the mapped stock array and one column header changes depending on which one; both default to portfolio data because that is always initially loaded

const StockList = ({portfolio, transactions, isTransactionsPage, dispatchRefresh}) => {
  const stocks = portfolio ? portfolio.stocks : transactions.transactions;

  let valueOrDate = "Value Per Share ($)";
  valueOrDate = isTransactionsPage ? "Date" : "Value Per Share ($)";
  let itemList = stocks.map(stock => <StockRow key={stock.id} {...stock} />)

  itemList = isTransactionsPage ? stocks.map(stock => <TransactionRow key={stock.id} {...stock} />) : stocks.map(stock => <StockRow key={stock.id} {...stock} />)

  // only render column headers if there are stocks/transactions
  const colHeaders = (
    <div className="stock-list top-row">
      <ul>
        <li>Symbol</li>
        <li>Company</li>
        <li>Qty</li>
        <li>{valueOrDate}</li>
        <li>Total Value ($)</li>
      </ul>
    </div>
  )

  // only render refresh btn for portfolio
  const refreshBtn = (
    <div className="refresh-btn flex-centered-all">
      <input type="submit" onClick={() => dispatchRefresh(portfolio.id)}
    value="Get latest values" />
    </div>
  )

  // if no stocks/transactions, changes message depending on which one
  const noStocks = isTransactionsPage ? <div className="body-text-large">You have no transactions on record.</div> : <div className="body-text-large">Your portfolio is empty.</div>

  if (!portfolio && !transactions) return null;

  return (
    <>
      <div className="stock-list padding-20">
        {stocks.length ? colHeaders : noStocks}
        {itemList}
      </div>
      {portfolio && stocks.length ? refreshBtn : <></>}
    </>
  )
}

export default StockList;
