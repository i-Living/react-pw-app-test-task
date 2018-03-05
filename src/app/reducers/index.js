import { combineReducers } from 'redux'

import user from './user'
import userList from './user-list'
import transaction from './transaction'

export default combineReducers({
  user,
  userList,
  transaction
})
