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
const addStock = (stock, price) => ({type: ADD_STOCK, stock, price});
const updateStock = (stock, price) => ({type: UPDATE_STOCK, stock, price})

// THUNK CREATORS

// takes in user.portfolioId
// also gets most updated stock prices, which don't need to be stored in the db due to how they constantly update
export const getPortfolioThunkCreator = (id) => async dispatch => {
  try {
    const userPortfolio = await axios.get(`/api/portfolio/${id}`);
    const portfolio = {...userPortfolio.data};
    const stocksWithValues = await Promise.all(
      portfolio.stocks.map(async stock => {
      const URL = `https://sandbox.iexapis.com/stable/stock/${stock.symbol}/quote?token=${STOCK_API_KEY}`;
      const dataFetch = await axios.get(URL);
      const updatedValue = dataFetch.data.latestPrice;
      stock.value = updatedValue;
      return stock;
    }));
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
export const addStockThunkCreator = (stock, price, id) => async dispatch => {
  try {
    const stockToBuy = await axios.post(`/api/portfolio/${id}`, stock);
    // if new stock, add; else, update existing stock
    // also send price so that the stock can have a .value in the store
    if (stockToBuy.data[1]) {
      dispatch(addStock(stockToBuy.data[0], price));
    } else {
      // make sure to set existing stock's quantity to equal stockToBuy's quantity, as it has already been incremented
      dispatch(updateStock(stockToBuy.data[0], price));
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
      return {
        ...state,
        stocks: updatedStocks
      }
    default:
      return state
  }
}
