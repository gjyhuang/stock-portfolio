import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {STOCK_API_KEY} from '../keys';
import Navbar from './Navbar';
import StockSelected from './StockSelected';
import StockForm from './StockForm';
import StockList from './StockList';
import Loader from './screens/PageLoader';
import {
  getTransactionsThunkCreator,
  getPortfolioThunkCreator,
  addStockThunkCreator,
  updateCashThunkCreator,
  addTransactionThunkCreator
} from '../store';

const Portfolio = ({loadInitialData, location, user, portfolio, transactions, dispatchAddStock, dispatchUpdateCash, dispatchAddTransaction}) => {
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
      const URL = `https://sandbox.iexapis.com/stable/stock/${name}/quote?token=${STOCK_API_KEY}`;
      const dataFetch = await axios.get(URL);
      const stock = dataFetch.data;
      if (stock) setSelectedStock(stock);
    } catch (err) {
      console.error(err);
    }
  }

  // submits stock in state
  // subtracts its price x quantity from user's total cash
  // updates store
  const buyStock = async (stockQuantity) => {
    const { symbol, companyName, latestPrice } = selectedStock;
    const quantity = Number(stockQuantity);
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      setError("Error: quantity must be a positive, whole number.");
      return;
    }
    const {totalCash} = user;
    const price = Math.floor(latestPrice * quantity * 100);
    if (price > totalCash) {
      setError("Error: not enough funds to purchase.");
      return;
    } else {
      setError("");
      const date = new Date();
      const convertedDate = date.toLocaleString();

      dispatchAddStock({ symbol, companyName, quantity, convertedDate }, latestPrice, user.portfolioId);
      dispatchUpdateCash(price, user.id);
      dispatchAddTransaction({symbol, companyName, price, quantity, convertedDate}, user.transactionHistoryId);
    }
  }

  console.log('selectedStock >>>>', selectedStock)
  let currCashStr = String(user.totalCash);
  let currCash = currCashStr.slice(0, currCashStr.length-2) + '.' + currCashStr.slice(currCashStr.length-2);

  if (!user.id || !portfolio.id || !transactions.id) {
    return <Loader />
  }

  // render transactions
  if (location.state && location.state.isTransactionsPage) {
    return (
      <>
      <Navbar />
      <div className="main-wrapper flex-display flex-wrap flex-space-arnd">
        <div id="transactions">
          <div className="header">Transactions</div>
          <StockList transactions={transactions} isTransactionsPage={true}/>
        </div>
      </div>
      </>
    )
  }

  // render portfolio
  return (
    <>
    <Navbar />
    <div className="main-wrapper flex-display flex-wrap flex-space-arnd">
      <div className="left-wrapper width-45vw min-width-200">
        <div id="portfolio" className="flex-wrap flex-justify-center">
          <div className="header">Portfolio</div>
          <div className="user-cash body-text-normal">Cash: ${currCash}</div>
          <StockList portfolio={portfolio}/>
        </div>
      </div>
      <div className="divider-col" />
      <div className="right-wrapper width-45vw min-width-200flex-display flex-dir-col flex-align-center">
        <div className="text-description body-text-normal padding-20">
          Look up a stock to purchase via its symbol.
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
        <div id="stock-selected" className=" flex-display flex-dir-col flex-align-center" style={{visibility: selectedStock.symbol ? 'visible' : 'hidden'}}>
          <StockSelected selectedStock={selectedStock} fetchSelectedStock={setSelectedStock} />
          <div className="text-description body-text-normal padding-20">
            Purchase this stock by entering the desired number of shares below and clicking 'Buy'.
          </div>
          <StockForm
            className="stock-form stock-buy"
            labelText='No. of shares:'
            value={amtToBuy}
            onClickCallback={buyStock}
            onChangeFunc={setAmtToBuy}
            inputType = "submit"
            inputValue = "Buy"
          />
        </div>
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
  dispatchAddStock: (stock, price, id) => dispatch(addStockThunkCreator(stock, price, id)),
  dispatchUpdateCash: (cash, id) => dispatch(updateCashThunkCreator(cash, id)),
  dispatchAddTransaction: (transaction, id) => dispatch(addTransactionThunkCreator(transaction, id))
})

const ConnectedPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

export default ConnectedPortfolio;
