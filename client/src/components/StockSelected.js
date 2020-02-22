import React from 'react';

const StockSelected = ({selectedStock}) => {
  const {
    symbol,
    latestPrice,
    companyName,
    latestUpdate,
    change,
    open
  } = selectedStock;


  const date = new Date(latestUpdate);
  const convertedDate = date.toLocaleString();
  const changeStatus = (latestPrice - open > 0) ? "greenTriangle" : "redTriangle";

  return (
  <>
    <div className="stock-row">
      <div className="stock-list top-row">
        <ul>
          <li>Symbol</li>
          <li>Company</li>
          <li>Latest Price ($)</li>
          <li>Latest Update</li>
          <li>Change</li>
        </ul>
      </div>
      <ul>
      <li className="flex-display"><div className={changeStatus}></div>{symbol}</li>
        <li>{companyName}</li>
        <li>{latestPrice}</li>
        <li>{convertedDate}</li>
        <li>{change}</li>
      </ul>
    </div>
  </>
  )
}

export default StockSelected;
