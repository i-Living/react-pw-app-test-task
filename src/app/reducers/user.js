import * as types from '../actionTypes'

export default function user(state = {}, {type, payload}) {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      return payload
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        ...payload
      }
    case types.USER_SIGNUP_SUCCESS:
      return payload
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        ...payload
      }
    case types.USER_LOGGED_OUT_SUCCESS:
      return {}
    case types.FETCH_USER_SUCCESS:
      return payload
    case types.FETCH_USER_FAILURE:
      return payload
    case types.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case types.CREATE_TRANSACTION_FAILURE:
      console.error(payload)
      return state
    case types.GO_TO_SIGNIN_FORM:
      return {}
    case types.GO_TO_SIGNUP_FORM:
      return {}
    default:
      return state
  }
}
