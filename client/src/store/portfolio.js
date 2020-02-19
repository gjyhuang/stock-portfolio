import axios from 'axios'

// INITIAL STATE

const defaultPortfolio = {};

// ACTION TYPES

const GET_PORTFOLIO = 'GET_PORTFOLIO';
const ADD_STOCK = 'ADD_STOCK';
const UPDATE_STOCK = 'UPDATE_STOCK';

// ACTION CREATORS

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio});
const addStock = stock => ({type: ADD_STOCK, stock});
const updateStock = stock => ({type: UPDATE_STOCK, stock})

// THUNK CREATORS

// takes in user.portfolioId
export const getPortfolioThunkCreator = (id) => async dispatch => {
  try {
    const userPortfolio = await axios.get(`/api/portfolio/${id}`);
    dispatch(getPortfolio(userPortfolio.data));
  } catch (err) {
    console.error(err);
  }
}

// receives an array containing the stock and a boolean representing whether the stock is new
// adds the selected stock to the portfolio
// or increments it if it already exists
// also adds to transaction history
export const addStockThunkCreator = (stock, id) => async dispatch => {
  try {
    const stockToBuy = await axios.post(`/api/portfolio/${id}`, stock);
    // if new stock, add; else, update existing stock
    if (stockToBuy.data[1]) {
      dispatch(addStock(stockToBuy.data[0]));
    } else {
      dispatch(updateStock(stockToBuy.data[0]));
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
      const addedNewStock = [...state.stocks, action.stock]
      return {
        ...state,
        stocks: addedNewStock
      }
    case UPDATE_STOCK:
      const updatedStocks = [...state.stocks]
      const stockToUpdate = updatedStocks.find(stock => stock.symbol === )
      return {
        ...state,
        stocks: updatedStocks
      }
    default:
      return state
  }
}
