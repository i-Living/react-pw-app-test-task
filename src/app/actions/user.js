import api from '../api'
import setAuthorizationHeader from '../utils/setAuthorizationHeader'
import decode from 'jwt-decode'
import {
  USER_LOGGIN_START,
  USER_LOGGIN_SUCCESS,
  USER_LOGGIN_FAILURE,
  USER_LOGGED_OUT_SUCCESS,
  USER_LOGGED_OUT_FAILURE,
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USERS_LIST_START,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILURE
} from "../actionTypes"

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

export const getUser = () => async dispatch => {
  dispatch({ type: FETCH_USER_START })
  try {
    let payload = await api.user.get()
    payload = payload.user_info_token
    const user = {
      token: localStorage.parrotwingsJWT,
      email: payload.email,
      username: payload.name,
      balance: payload.balance
    }
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: user
    })
  } catch (err) {
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const filterUsers = filter => async dispatch => {
  dispatch({ type: FETCH_USERS_LIST_START })
  try {
    const users = await api.user.filter(filter)
    dispatch({
      type: FETCH_USERS_LIST_SUCCESS,
      payload: users
    })
  } catch (err) {
    dispatch({
      type: FETCH_USERS_LIST_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const login = data => async dispatch => {
  dispatch({ type: USER_LOGGIN_START })
  try {
    const userToken = await api.user.login(data)
    localStorage.parrotwingsJWT = userToken.id_token
    setAuthorizationHeader(localStorage.parrotwingsJWT)
    const user = getUserFromToken(userToken.id_token)
    dispatch({
      type: USER_LOGGIN_SUCCESS,
      payload: user
    })
  } catch (err) {
    dispatch({
      type: USER_LOGGIN_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const logout = () => dispatch => {
  try {
    localStorage.removeItem("parrotwingsJWT")
    setAuthorizationHeader()
    dispatch({
      type: USER_LOGGED_OUT_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: USER_LOGGED_OUT_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const signup = data => async dispatch => {
  dispatch({ type: USER_SIGNUP_START })
  try {
    const userToken = await api.user.signup(data)
    if (!userToken.id_token) {
      const payload = {
        loginError: userToken.response.data
      }
      dispatch({
        type: USER_SIGNUP_FAILURE,
        payload: payload,
        error: true
      })
    } else {
      localStorage.parrotwingsJWT = userToken.id_token
      setAuthorizationHeader(localStorage.parrotwingsJWT)
      const user = getUserFromToken(userToken.id_token)
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: user
      })
    }
  } catch (err) {
    dispatch({
      type: USER_SIGNUP_FAILURE,
      payload: err,
      error: true
    })
  }
}
