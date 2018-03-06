import {FETCH_USER_TRANSACTIONS_SUCCESS} from '../actionTypes'

export default function transaction (state = {}, {type, payload}) {
  switch (type) {
    case FETCH_USER_TRANSACTIONS_SUCCESS:
      return payload
    default:
      return state
  }
}
