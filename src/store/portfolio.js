import axios from 'axios'

// INITIAL STATE

const defaultPortfolio = {};

// ACTION TYPES

const GET_PORTFOLIO = 'GET_PORTFOLIO';
const ADD_STOCK = 'ADD_STOCK';

// ACTION CREATORS

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio});
const addStock = stock => ({type: ADD_STOCK, stock});

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

// adds the selected stock to the portfolio
// or increments it if it already exists
// also adds to transaction history
export const addStockThunkCreator = (stock) => async dispatch => {
  try {

  } catch (err) {
    console.error(err);
  }
}

// REDUCER

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio
    default:
      return state
  }
}
