import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import Transaction from './containers/transaction'
import TransactionsList from './containers/transactions-list'
import LoginForm from './containers/login-form'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='Root'>
        <Route path="/" component={App} />
        <Switch>
          <Route path="/sign-in" component={LoginForm} />
          <Route path="/sign-up" component={LoginForm} />
          <Route path="/transaction" component={Transaction} />
          <Route path="/transactions-list" component={TransactionsList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
