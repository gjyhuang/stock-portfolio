import axios from 'axios'
import {STOCK_API_KEY} from '../keys';

// INITIAL STATE

const defaultPortfolio = {};

// ACTION TYPES

const GET_PORTFOLIO = 'GET_PORTFOLIO';
const ADD_STOCK = 'ADD_STOCK';
const UPDATE_STOCK = 'UPDATE_STOCK';

// ACTION CREATORS

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio});
const addStock = (stock, price, status) => ({type: ADD_STOCK, stock, price, status});
const updateStock = (stock, price, status) => ({type: UPDATE_STOCK, stock, price, status})

// THUNK CREATORS

// takes in user.portfolioId
// also gets most updated stock prices, which don't need to be stored in the db due to how they constantly update
  // also gets recentPrice - open, to determine whether red or green arrow displays
export const getPortfolioThunkCreator = (id) => async dispatch => {
  try {
    const userPortfolio = await axios.get(`/api/portfolio/${id}`);
    const portfolio = {...userPortfolio.data};
    // make batch call to API for quotes for entire portfolio
    const symbols = portfolio.stocks
      .map(stock => stock.symbol)
      .join(',');
    const URL = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&range=1m&last=5&&token=${STOCK_API_KEY}`;
    const dataFetch = await axios.get(URL);

    // map through portfolio array to access nested objects from response object
    const stocksWithValues = portfolio.stocks.map(stock => {
      const currData = dataFetch.data[stock.symbol].quote;
      const updatedValue = currData.latestPrice;
      const status = currData.latestPrice - currData.open;
      stock.value = updatedValue;
      stock.status = status;
      return stock;
    });
    portfolio.stocks = stocksWithValues;
    dispatch(getPortfolio(portfolio));
  } catch (err) {
    console.error(err);
  }
}

// receives an array containing the stock and a boolean representing whether the stock is new
// adds the selected stock to the portfolio, with value
// or increments it if it already exists
// also adds to transaction history
export const addStockThunkCreator = (stock, price, status, id) => async dispatch => {
  try {
    const stockToBuy = await axios.post(`/api/portfolio/${id}`, stock);
    // if new stock, add; else, update existing stock
    // also send price so that the stock can have a .value in the store
    if (stockToBuy.data[1]) {
      dispatch(addStock(stockToBuy.data[0], price, status));
    } else {
      // make sure to set existing stock's quantity to equal stockToBuy's quantity, as it has already been incremented
      dispatch(updateStock(stockToBuy.data[0], price, status));
    }
  } catch (err) {
    console.error(err);
  }
}

// REDUCER

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio
    case ADD_STOCK:
      const stockToAdd = action.stock;
      stockToAdd.value = action.price;
      const addedNewStock = [...state.stocks, stockToAdd]
      return {
        ...state,
        stocks: addedNewStock
      }
    case UPDATE_STOCK:
      const updatedStocks = [...state.stocks]
      const actionStock = action.stock;
      let stockToUpdate = updatedStocks.find(stock => stock.symbol === actionStock.symbol);
      stockToUpdate.quantity = actionStock.quantity;
      stockToUpdate.value = action.price;
      stockToUpdate.status = action.status;
      return {
        ...state,
        stocks: updatedStocks
      }
    default:
      return state
  }
}
