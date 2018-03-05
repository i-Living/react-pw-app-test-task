import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Header from './components/header'
import HomePage from './components/home-page'
import LoginForm from './containers/login-form'
import Logout from './containers/logout'
import Transaction from './containers/transaction'
import TransactionsList from './containers/transactions-list'
import { getUser, logout } from './actions/user'


import './styles/App.css'

class App extends React.Component {

  /**
   * App component needs to update user data if user is authenticated.
   * Logout user token if its token expired
   */
  componentDidMount() {
    if (this.props.isAuthenticated)
      this.props.getUser().then(() => {
        if (this.props.getUserError) {
          this.props.logout()
        }
      })
  }

  render() {
    const { location, isAuthenticated, user } = this.props
    return (
      <div className='App'>
        <Header isAuthenticated={isAuthenticated} location={location} user={user}/>
        <Route exact path="/" render={props => <HomePage {...props} isAuthenticated={isAuthenticated} />}  />
        {isAuthenticated &&
          <Switch>
            <Route exact path="/sign-in" component={LoginForm} />
            <Route exact path="/sign-up" component={LoginForm} />
            <Route exact path="/logout" render={props => <Logout {...props} isAuthenticated={isAuthenticated} />} />
            <Route exact path="/transaction" component={Transaction} />
            <Route exact path="/transactions-list" component={TransactionsList} />
          </Switch>
        }
        {!isAuthenticated && (location.pathname !== "/") &&
          <LoginForm isAuthenticated={isAuthenticated} location={location}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    getUserError: state.user.getUserError ? !!state.user.getUserError : false,
    isAuthenticated: state.user ? !!state.user.email : false,
    user: state.user,
  }
}

const mapDispatchToProps = {
  getUser,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
