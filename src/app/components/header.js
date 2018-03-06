import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Header extends React.Component {
  render () {
    const { user, location, isAuthenticated } = this.props
    return (
      <div className='text-center'>
        <header className='App-header'>
          {!isAuthenticated
            ? (
              <div className=''>
                <h4>PW Application</h4>
                {(location.pathname === '/sign-in' || location.pathname === '/sign-up')
                  ? <div />
                  : <div className='login-section'>
                    <Link to='/sign-in'>Sign in </Link>
                    /
                    <Link to='/sign-up'> Sign up</Link>
                  </div>
                }
              </div>
            )
            : (
              <div className='d-flex justify-content-between'>
                <div className='user'>
                  {user.username && <h5>{user.username}: {user.balance}</h5>}
                </div>
                <div className='header-navigation'>
                  <Link className='px-2' to='/transaction'>Transaction</Link>
                  <Link className='px-2' to='/transactions-list'>History</Link>
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
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    balance: PropTypes.number
  })
}

export default Header
