import React from 'react'
import ReactDOM from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import decode from "jwt-decode"
import reducer from './app/reducers'
import Root from './app/Root'
import setAuthorizationHeader from "./app/utils/setAuthorizationHeader"

import './app/styles/index.css'
import './app/styles/bootstrap.min.css'


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

if (localStorage.parrotwingsJWT) {
  const payload = decode(localStorage.parrotwingsJWT)
  const user = {
    token: localStorage.parrotwingsJWT,
    email: payload.email,
    confirmed: payload.confirmed
  }
  setAuthorizationHeader(localStorage.parrotwingsJWT)
  store.dispatch({
      type: "USER_LOGGIN_SUCCESS",
      payload: user
  })
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
