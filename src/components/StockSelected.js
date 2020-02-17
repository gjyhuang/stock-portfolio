import React from 'react';

const StockSelected = ({selectedStock, fetchSelectedStock}) => {
  const {
    symbol,
    latestPrice,
    companyName,
    latestUpdate,
    change,
    ytdChange
  } = selectedStock;

  return (
  <>
    <div className="stock-row">
      <ul>
        <li>Symbol</li>
        <li>Company</li>
        <li>Latest Price</li>
        <li>Latest Update</li>
        <li>Change</li>
        <li>Change YTD</li>
      </ul>
      <ul>
        <li>{symbol}</li>
        <li>{companyName}</li>
        <li>{latestPrice}</li>
        <li>{latestUpdate}</li>
        <li>{change}</li>
        <li>{ytdChange}</li>
      </ul>
    </div>
  </>
  )
}

export default StockSelected;
