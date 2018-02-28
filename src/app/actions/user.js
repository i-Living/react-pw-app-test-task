import api from "../api"
import setAuthorizationHeader from "../utils/setAuthorizationHeader"
import {
  USER_LOGGIN_SUCCESS,
  USER_LOGGIN_FAILURE,
  USER_LOGGED_OUT,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from "../actionTypes"

export const login = data => async dispatch => {
  try {
    const userToken = await api.user.login(data)
    localStorage.parrotwingsJWT = userToken.id_token
    dispatch({
      type: USER_LOGGIN_SUCCESS,
      payload: userToken
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
  localStorage.removeItem("parrotwingsJWT")
  setAuthorizationHeader()
  dispatch({
    type: USER_LOGGED_OUT
  })
}

export const signup = data => async dispatch => {
  try {
    const userToken = await api.user.signup(data)
    localStorage.parrotwingsJWT = userToken.id_token
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: userToken
    })
  } catch (err) {
    dispatch({
      type: USER_SIGNUP_FAILURE,
      payload: err,
      error: true
    })
  }
}
