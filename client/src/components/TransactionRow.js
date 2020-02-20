import React from 'react';

const TransactionRow = ({id, symbol, companyName, priceAtPurchase, quantity, date}) => {
  let totalValue = (priceAtPurchase / 100).toFixed(2)
  return (
    <div className="transaction-row">
      <ul>
        <li>{symbol}</li>
        <li>{companyName}</li>
        <li>{quantity}</li>
        <li>{date}</li>
        <li>{totalValue}</li>
      </ul>
    </div>
  )
}

export default TransactionRow;
