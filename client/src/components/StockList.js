import React from 'react';
import axios from 'axios'
import {STOCK_API_KEY} from '../keys';
import StockRow from './StockRow';

const StockList = ({portfolio}) => {
  const {stocks} = portfolio;

  if (!portfolio) return null;
  return (
    <div className="stock-list padding-20">
      <div className="stock-list top-row">
        <ul>
          <li>Symbol</li>
          <li>Company</li>
          <li>Quantity</li>
          <li>Value Per Share ($)</li>
          <li>Total Value ($)</li>
        </ul>
      </div>
      {stocks.map(stock => <StockRow key={stock.id} {...stock} />)}
    </div>
  )
}

export default StockList;
