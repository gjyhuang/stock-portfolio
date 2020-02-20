import React from 'react';

const StockRow = ({id, symbol, companyName, quantity, value}) => {
  const totalValue = value * quantity;
  return (
    <div className="stock-row">
      <ul>
        <li>{symbol}</li>
        <li>{companyName}</li>
        <li>{quantity}</li>
        <li>{value}</li>
        <li>{totalValue}</li>
      </ul>
    </div>
  )
}

export default StockRow;
