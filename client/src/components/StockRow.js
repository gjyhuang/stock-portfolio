import React from 'react';

const StockRow = ({symbol, companyName, quantity, value, status}) => {
  let totalValue = value * quantity;
  totalValue = totalValue.toFixed(2);

  const changeStatus = status > 0 ? "greenTriangle" : "redTriangle";

  return (
    <div className="stock-row">
      <ul>
        <li className="flex-display"><div className={changeStatus}></div>{symbol}</li>
        <li>{companyName}</li>
        <li>{quantity}</li>
        <li>{value}</li>
        <li>{totalValue}</li>
      </ul>
    </div>
  )
}

export default StockRow;
