import {
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILURE
} from '../actionTypes'

export default function userList (state = {}, {type, payload}) {
  switch (type) {
    case FETCH_USERS_LIST_SUCCESS:
      return payload
    case FETCH_USERS_LIST_FAILURE:
      console.error(payload)
      return payload
    default:
      return state
  }
}
