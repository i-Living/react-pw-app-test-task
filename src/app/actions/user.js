import api from '../api'
import setAuthorizationHeader from '../utils/setAuthorizationHeader'
import decode from 'jwt-decode'
import * as types from '../actionTypes'

// Get user data from local storage.
export const getUserFromToken = (token) => {
  let payload = {}
  try {
    payload = decode(token)
  } catch (e) {
    console.error(e)
  }
  const user = {
    token: token,
    email: payload.email,
    username: payload.username,
    balance: payload.balance
  }
  return user
}

// Get user with api.
export const getUser = () => async dispatch => {
  dispatch({ type: types.FETCH_USER_START })
  try {
    let payload = await api.user.get()
    if (payload.user_info_token) {
      payload = payload.user_info_token
      const user = {
        token: window.localStorage.parrotwingsJWT,
        email: payload.email,
        username: payload.name,
        balance: payload.balance
      }
      dispatch({
        type: types.FETCH_USER_SUCCESS,
        payload: user
      })
    } else {
      const getUserError = {
        getUserError: payload.response
      }
      dispatch({
        type: types.FETCH_USER_FAILURE,
        payload: getUserError
      })
    }
  } catch (err) {
    dispatch({
      type: types.FETCH_USER_FAILURE,
      payload: err,
      error: true
    })
  }
}

// Filter recipients with api.
export const filterUsers = filter => async dispatch => {
  dispatch({ type: types.FETCH_USERS_LIST_START })
  try {
    const users = await api.user.filter(filter)
    dispatch({
      type: types.FETCH_USERS_LIST_SUCCESS,
      payload: users
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_USERS_LIST_FAILURE,
      payload: err,
      error: true
    })
  }
}

// Login with api. Save token to local storage. Update authorization bearer.
export const login = data => async dispatch => {
  dispatch({ type: types.USER_LOGIN_START })
  try {
    const userToken = await api.user.login(data)
    if (!userToken.id_token) {
      const payload = {
        loginError: userToken.response.data
      }
      dispatch({
        type: types.USER_LOGIN_FAILURE,
        payload: payload,
        error: true
      })
    } else {
      window.localStorage.parrotwingsJWT = userToken.id_token
      setAuthorizationHeader(window.localStorage.parrotwingsJWT)
      const user = getUserFromToken(userToken.id_token)
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: user
      })
    }
  } catch (err) {
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload: err,
      error: true
    })
  }
}

// Logout. Remove token from local storage. Clear authorization bearer.
export const logout = () => dispatch => {
  try {
    window.localStorage.removeItem('parrotwingsJWT')
    setAuthorizationHeader()
    dispatch({
      type: types.USER_LOGGED_OUT_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: types.USER_LOGGED_OUT_FAILURE,
      payload: err,
      error: true
    })
  }
}

// Registration new user with api. Save token to local storage. Update authorization bearer.
export const signup = data => async dispatch => {
  dispatch({ type: types.USER_SIGNUP_START })
  try {
    const userToken = await api.user.signup(data)
    if (!userToken.id_token) {
      const payload = {
        loginError: userToken.response.data
      }
      dispatch({
        type: types.USER_SIGNUP_FAILURE,
        payload: payload,
        error: true
      })
    } else {
      window.localStorage.parrotwingsJWT = userToken.id_token
      setAuthorizationHeader(window.localStorage.parrotwingsJWT)
      const user = getUserFromToken(userToken.id_token)
      dispatch({
        type: types.USER_SIGNUP_SUCCESS,
        payload: user
      })
    }
  } catch (err) {
    dispatch({
      type: types.USER_SIGNUP_FAILURE,
      payload: err,
      error: true
    })
  }
}
