import {
  USER_LOGGIN_SUCCESS,
  USER_LOGGED_OUT,
  USER_SIGNUP_SUCCESS,
} from "../actionTypes"

export default function user(state = {}, {type, payload}) {
  switch (type) {
    case USER_LOGGIN_SUCCESS:
      return {...state, user: payload}
    case USER_SIGNUP_SUCCESS:
      return {...state, newUser: payload}
    case USER_LOGGED_OUT:
      return {}
    default:
      return state
  }
}
