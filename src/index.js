import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { getUserFromToken } from './app/actions/user'
import reducer from './app/reducers'
import App from './app/App'
import setAuthorizationHeader from './app/utils/setAuthorizationHeader'
import { USER_LOGIN_SUCCESS } from './app/actionTypes'

import './app/styles/index.css'
import './app/styles/bootstrap.min.css'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

// Setup user data if local storagehas token.
if (window.localStorage.parrotwingsJWT) {
  const user = getUserFromToken(window.localStorage.parrotwingsJWT)
  setAuthorizationHeader(window.localStorage.parrotwingsJWT)
  store.dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user
  })
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
