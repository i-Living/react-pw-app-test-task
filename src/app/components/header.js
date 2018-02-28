import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Header extends Component {
  render() {
    const { user, location, logged } = this.props
    return (
      <div className="text-center">
        <header className="App-header">
          {!logged
            ? (
              <div className="">
                <h4>PW Application</h4>
                {(location.pathname === "/sign-in" || location.pathname === "/sign-up")
                  ? <div></div>
                  : <div className="login-section">
                      <Link to='/sign-in'> Sign in </Link>
                      /
                      <Link to='/sign-up'> Sign up </Link>
                    </div>
                }
              </div>
            )
            : (
              <div className="d-flex justify-content-between">
                <div className="user">
                  {user.name && <h5>{user.name}: {user.balance}</h5>}
                </div>
                <div>
                  <Link className="px-2" to='/transaction'> Transaction </Link>
                  <Link className="px-2" to='/transactions-list'> History </Link>
                </div>
                <Link to='/logout'> Logout </Link>
              </div>
            )
          }
        </header>
      </div>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  logged: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  })
}

export default Header
