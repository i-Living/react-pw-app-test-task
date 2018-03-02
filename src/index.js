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

import './app/styles/index.css'
import './app/styles/bootstrap.min.css'


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

if (localStorage.parrotwingsJWT) {
  let user = getUserFromToken(localStorage.parrotwingsJWT)
  setAuthorizationHeader(localStorage.parrotwingsJWT)
  store.dispatch({
      type: "USER_LOGGIN_SUCCESS",
      payload: user
  })
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
