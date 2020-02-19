import axios from 'axios';

// INITIAL STATE

const defaultTransactions = {};

// ACTION TYPES

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const ADD_TRANSACTION = 'ADD_TRANSACTION';

// ACTION CREATORS

const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions});
const addTransaction = (transaction) => ({type: ADD_TRANSACTION, transaction});

// THUNK CREATORS

// takes in user.transactionHistoryId
export const getTransactionsThunkCreator = (id) => async dispatch => {
  try {
    const userTransactions = await axios.get(`/api/transactions/${id}`);
    dispatch(getTransactions(userTransactions.data));
  } catch (err) {
    console.error(err);
  }
}

// takes in user.transactionHistoryId
// adds new transaction from portfolio upon stock purchase
export const addTransactionThunkCreator = (transaction, id) => async dispatch => {
  try {
    const transactionToAdd = await axios.post(`/api/transactions/${id}`, transaction);
    dispatch(addTransaction(transactionToAdd));
  } catch (err) {
    console.error(err);
  }
}

// REDUCER

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    case ADD_TRANSACTION:
      // pushes new transaction to transactions and updates totalPurchaseValue
      const updatedTotalValue = state.totalPurchaseValue + action.transaction.price;
      const updatedTransactions = [...state.transactions, action.transaction]
      return {
        ...state,
        totalPurchaseValue: updatedTotalValue,
        updatedTransactions
      }
    default:
      return state
  }
}
