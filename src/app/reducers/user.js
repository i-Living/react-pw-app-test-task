import {
  USER_LOGGIN_SUCCESS,
  USER_LOGGED_OUT_SUCCESS,
  USER_SIGNUP_SUCCESS,
  FETCH_USER_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE
} from '../actionTypes'

export default function user(state = {}, {type, payload}) {
  switch (type) {
    case USER_LOGGIN_SUCCESS:
      return payload
    case USER_SIGNUP_SUCCESS:
      return payload
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
    default:
      return state
  }
}
