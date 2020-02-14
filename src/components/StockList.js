import React from 'react';
import axios from 'axios';
import {STOCK_API_KEY} from '../../keys';

async function getStock(name) {
  // const URL = `https://sandbox.iexapis.com/stable/stock/${name}/quote?token=${STOCK_API_KEY}`;
  const URL = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${STOCK_API_KEY}`;
  // const URL = `https://sandbox.iexapis.com/stable/stock/market/list/iexpercent?token=${STOCK_API_KEY}`;
  const data = await axios.get(URL);
  console.log(data);
}

const StockList = props => {
  const allStockNames = ["AAPL", "AXP", "BA", "CAT", "CSCO", "CVX", "DIS", "DOW", "GS", "HD", "IBM", "INTC", "JNJ", "JPM", "KO", "MCD", "MMM", "MRK", "MSFT", "NKE", "PFE", "PG", "TRV", "UNH", "UTX", "V", "VZ", "WBA", "WMT", "XOM"]
  // const allStocks = allStockNames.map(stock => getStocks(stock));
  let allStocks = "";
  allStockNames.forEach(stock => allStocks += stock);
  // console.log(allStocks);
  getStock(allStockNames);
  return (
  <div id="stock-list">

  </div>
  )
}

export default StockList;
