import React from 'react';

const StockSelected = ({selectedStock}) => {
  const {
    symbol,
    latestPrice,
    companyName,
    latestUpdate,
    change,
  } = selectedStock;


  const date = new Date(latestUpdate);
  const convertedDate = date.toLocaleString();

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
        <li>{symbol}</li>
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
