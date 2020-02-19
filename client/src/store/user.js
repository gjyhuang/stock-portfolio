import axios from 'axios'
import history from '../history'

// INITIAL STATE

const defaultUser = {}

// ACTION TYPES

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_CASH = 'UPDATE_CASH'

// ACTION CREATORS

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateCash = cash => ({type: UPDATE_CASH, cash})

// THUNK CREATORS

// checks for persisted login. if no user, sends to login/signup
// else, sends the logged in user to their portfolio
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    if (res.data) history.push('/portfolio')
    else history.push(('/'))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/portfolio')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const updateCashThunkCreator = (cash, id) => async dispatch => {
  try {
    const updatedUser = await axios.put(`/api/users/${id}`, {cash});
    dispatch(updateCash(updatedUser.data.totalCash));
  } catch (err) {
    console.error(err);
  }
}

// REDUCER

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_CASH:
      return {
        ...state,
        totalCash: action.cash
      }
    default:
      return state
  }
}
