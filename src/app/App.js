import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import Header from './components/header'
import HomePage from './components/home-page'
import LoginForm from './containers/login-form'
import Logout from './containers/logout'
import Transaction from './containers/transaction'
import TransactionsList from './containers/transactions-list'
import { getUser } from './actions/user'

import './styles/App.css'

class App extends React.Component {

  componentDidMount() {
    if (this.props.isAuthenticated)
      this.props.getUser()
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

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user ? !!state.user.email : false,
    user: state.user
  }
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
