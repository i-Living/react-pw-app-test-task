import api from '../api'
import * as types from '../actionTypes'

// Get user transactions with api.
export const getTransactions = () => async dispatch => {
  dispatch({ type: types.FETCH_USER_TRANSACTIONS_START })
  try {
    const list = await api.transaction.list()
    dispatch({
      type: types.FETCH_USER_TRANSACTIONS_SUCCESS,
      payload: list
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_USER_TRANSACTIONS_FAILURE,
      payload: err,
      error: true
    })
  }
}

// Create new transaction with api.
export const createTransaction = (recipient, amount) => async dispatch => {
  dispatch({ type: types.CREATE_TRANSACTION_START })
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
      type: types.CREATE_TRANSACTION_SUCCESS,
      payload: balance
    })
  } catch (err) {
    dispatch({
      type: types.CREATE_TRANSACTION_FAILURE,
      payload: err,
      error: true
    })
  }
}
