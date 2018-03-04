import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGGED_OUT_SUCCESS,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  FETCH_USER_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
  GO_TO_SIGNIN_FORM,
  GO_TO_SIGNUP_FORM
} from '../actionTypes'

export default function user(state = {}, {type, payload}) {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return payload
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        ...payload
      }
    case USER_SIGNUP_SUCCESS:
      return payload
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        ...payload
      }
    case USER_LOGGED_OUT_SUCCESS:
      return {}
    case FETCH_USER_SUCCESS:
      return payload
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case CREATE_TRANSACTION_FAILURE:
      console.error(payload)
      return state
    case GO_TO_SIGNIN_FORM:
      return {}
    case GO_TO_SIGNUP_FORM:
      return {}
    default:
      return state
  }
}
