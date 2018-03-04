import api from '../api'
import {
  FETCH_USER_TRANSACTIONS_START,
  FETCH_USER_TRANSACTIONS_SUCCESS,
  FETCH_USER_TRANSACTIONS_FAILURE,
  CREATE_TRANSACTION_START,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE
} from '../actionTypes'

// Get user transactions with api.
export const getTransactions = () => async dispatch => {
  dispatch({ type: FETCH_USER_TRANSACTIONS_START })
  try {
    const list = await api.transaction.list()
    dispatch({
      type: FETCH_USER_TRANSACTIONS_SUCCESS,
      payload: list
    })
  } catch (err) {
    dispatch({
      type: FETCH_USER_TRANSACTIONS_FAILURE,
      payload: err,
      error: true
    })
  }
}

// Create new transaction with api.
export const createTransaction = (recipient, amount) => async dispatch => {
  dispatch({ type: CREATE_TRANSACTION_START })
  try {
    const transaction = {
      name: recipient,
      amount: amount
    }
    const payload = await api.transaction.create(transaction)
    const balance = {
      balance: payload.trans_token.balance
    }
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: balance
    })
  } catch (err) {
    dispatch({
      type: CREATE_TRANSACTION_FAILURE,
      payload: err,
      error: true
    })
  }
}
