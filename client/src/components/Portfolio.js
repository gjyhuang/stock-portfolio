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

const Portfolio = ({loadInitialData, location, user, portfolio, transactions, dispatchAddStock, dispatchUpdateCash, dispatchAddTransaction, dispatchRefresh}) => {
  const [stockFromSearch, setStockFromSearch] = React.useState("");
  const [selectedStock, setSelectedStock] = React.useState({});
  const [amtToBuy, setAmtToBuy] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => loadInitialData(user), [])

  // makes IEX API call for the selected stock and sets it to state
    // if the stock doesn't exist, display error
  // pass object down to StockSelected component
  const getStock = async (name) => {
    name = name.toUpperCase();
    try {
      const URL = `https://sandbox.iexapis.com/stable/stock/${name}/quote?token=${STOCK_API_KEY}`;
      const dataFetch = await axios.get(URL);
      const stock = dataFetch.data;
      if (stock) {
        setErrorMessage("");
        setSelectedStock(stock);
      }
    } catch (err) {
      // make sure no selected stock is on display - keeps error message at the bottom of the right column
      console.error(err);
      setSelectedStock("");
      setAmtToBuy(1);
      if (err.response.status === 429) {
        setErrorMessage("You have attempted too many searches in too short a time frame. Please wait before trying again.")
      } else if (err.response.status === 500) {
        setErrorMessage("System error. Please try again shortly.")
      } else {
        setErrorMessage("This stock does not exist, or is not available for purchase.");
      }
    }
  }

  // submits stock in state
  // subtracts its price x quantity from user's total cash
  // updates store
  const buyStock = async (stockQuantity) => {
    const { symbol, companyName, latestPrice, open } = selectedStock;
    const quantity = Number(stockQuantity);
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      setErrorMessage("Error: quantity must be a positive, whole number.");
      return;
    }
    const {totalCash} = user;
    const status = latestPrice - open;
    const price = Math.floor(latestPrice * quantity * 100);
    if (price > totalCash) {
      setErrorMessage("Error: not enough funds to purchase.");
      return;
    } else {
      // in this case only, set "error" message to one confirming transaction went through
      setErrorMessage("Transaction complete!");
      const date = new Date();
      const convertedDate = date.toLocaleString();
      dispatchAddStock({ symbol, companyName, quantity, convertedDate }, latestPrice, status, user.portfolioId);
      dispatchUpdateCash(price, user.id);
      dispatchAddTransaction({symbol, companyName, price, quantity, convertedDate}, user.transactionHistoryId);
    }
  }

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
          <StockList portfolio={portfolio} dispatchRefresh={dispatchRefresh}/>
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
          value={stockFromSearch}
          onClickCallback={getStock}
          onChangeFunc={setStockFromSearch}
          inputType = "submit"
          inputValue = "Search"
        />
        <div id="stock-selected" className=" flex-display flex-dir-col flex-align-center" style={{display: selectedStock.symbol ? '' : 'none'}}>
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
        {errorMessage ?
          <div className="text-description body-text-normal padding-20 text-align-center">{errorMessage}</div>
          : <></>}
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
  dispatchAddStock: (stock, price, status, id) => dispatch(addStockThunkCreator(stock, price, status, id)),
  dispatchUpdateCash: (cash, id) => dispatch(updateCashThunkCreator(cash, id)),
  dispatchAddTransaction: (transaction, id) => dispatch(addTransactionThunkCreator(transaction, id)),
  dispatchRefresh: (id) => dispatch(getPortfolioThunkCreator(id))
})

const ConnectedPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

export default ConnectedPortfolio;
