import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { logout } from '../actions/user'

class Logout extends React.Component {

  onLogout() {
    this.props.logout()
    this.props.history.push("/sign-in")
  }

  render() {
    const { isAuthenticated } = this.props
    return (
        <div className="logout text-center container">
          {isAuthenticated ? (
            <div>
              <h3>Are you sure u want to loguot?</h3>
              <br></br>
              <button className="btn btn-lg btn-primary" onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link>
            </div>
          )}
        </div>
    )
  }
}

Logout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user ? !!state.user.email : false,
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
