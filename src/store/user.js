import axios from 'axios'
import history from '../history'

// INITIAL STATE

const defaultUser = {}

// ACTION TYPES

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// ACTION CREATORS

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  console.log(email, password, method)
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  console.log('res?', res);
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

// REDUCER

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
