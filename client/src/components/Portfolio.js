import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {STOCK_API_KEY} from '../keys';
import Navbar from './Navbar';
import StockSelected from './StockSelected';
import StockForm from './StockForm';
import {
  getTransactionsThunkCreator,
  getPortfolioThunkCreator,
  addStockThunkCreator,
  updateCashThunkCreator
} from '../store';

const Portfolio = ({loadInitialData, user, dispatchAddStock, dispatchUpdateCash}) => {
  const [stockToBuy, setStockToBuy] = React.useState("");
  const [selectedStock, setSelectedStock] = React.useState({});
  const [amtToBuy, setAmtToBuy] = React.useState(0);
  const [transactionError, setError] = React.useState("");

  useEffect(() => loadInitialData(user), [])

  // makes IEX API call for the selected stock and sets it to state
  // pass object down to StockSelected component
  const getStock = async (name) => {
    name = name.toUpperCase();
    try {
      const URL = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${STOCK_API_KEY}`;
      const dataFetch = await axios.get(URL);
      const stock = dataFetch.data[name]
      if (stock) setSelectedStock(stock.quote);
    } catch (err) {
      console.error(err);
    }
  }

  // submits stock in state
  // subtracts its price x quantity from user's total cash
  // updates store
  const buyStock = async (stockQuantity) => {
    const { symbol, companyName, latestUpdate, latestPrice } = selectedStock;
    const quantity = Number(stockQuantity);
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      setError("Error: quantity must be a positive, whole number.");
      return;
    }
    const totalCash = {user};
    const price = latestPrice * quantity * 100;
    if (price > totalCash) {
      setError("Error: not enough funds to purchase.");
    } else {
      dispatchAddStock({ symbol, companyName, quantity, latestUpdate }, user.portfolioId);
      dispatchUpdateCash(price, user.id);
    }
  }

  console.log('selectedStock >>>>', selectedStock)
  let currCashStr = String(user.totalCash);
  let currCash = currCashStr.slice(0, currCashStr.length-2) + '.' + currCashStr.slice(currCashStr.length-2);

  return (
    <>
    <Navbar />
    <div id="main-wrapper">
      <div id="portfolio">
        <div className="header">My Portfolio</div>
        <div className="user-cash">Cash: ${currCash}</div>
      </div>
      <StockForm
        className="stock-form stock-search"
        labelText='Stock Ticker:'
        value={stockToBuy}
        onClickCallback={getStock}
        onChangeFunc={setStockToBuy}
        inputType = "submit"
        inputValue = "Search"
      />
      <div id="stock-selected" style={{visibility: selectedStock.symbol ? 'visible' : 'hidden'}}>
        <StockSelected selectedStock={selectedStock} fetchSelectedStock={setSelectedStock} />
        <div className="text-description">
          Purchase this stock by entering the desired number of shares below and clicking 'Buy'.
        </div>
        <StockForm
          className="stock-form stock-buy"
          labelText='Number of shares:'
          value={amtToBuy}
          onClickCallback={buyStock}
          onChangeFunc={setAmtToBuy}
          inputType = "submit"
          inputValue = "Buy"
        />
      </div>
    </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    portfolio: state.portfolio,
    transactions: state.transactions
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadInitialData(user) {
    dispatch(getPortfolioThunkCreator(user.portfolioId));
    dispatch(getTransactionsThunkCreator(user.transactionHistoryId));
  },
  dispatchAddStock: (stock, id) => dispatch(addStockThunkCreator(stock, id)),
  dispatchUpdateCash: (cash, id) => dispatch(updateCashThunkCreator(cash, id))
})

const ConnectedPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

export default ConnectedPortfolio;
