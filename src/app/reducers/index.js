import { combineReducers } from 'redux'

import user from './user'
import userList from './userList'
import transaction from './transaction'

export default combineReducers({
  user,
  userList,
  transaction
})
