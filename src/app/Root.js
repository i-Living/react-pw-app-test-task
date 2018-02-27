import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import Transaction from './containers/transaction'
import TransactionsList from './containers/transactions-list'
import SignIn from './containers/sign-in'
import SignUp from './containers/sign-up'

const Root = ({ store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='Root'>
      <Route path="/" component={App} />
        {/* <Route path="/" component={Header} logged={true} /> */}
        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
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
