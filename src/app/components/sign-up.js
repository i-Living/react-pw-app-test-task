import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/login-form.css'

class SignUp extends Component {

  render() {
    const { email, username, password, password2, wrongPass } = this.props.payload
    return (
      <form className="form-signin" onSubmit={this.props.onSubmit}>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input
          type="email"
          name="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={this.props.onChange}
          autoFocus
        />
        <label htmlFor="inputLogin" className="sr-only">Login</label>
        <input
          type="text"
          name="username"
          id="inputLogin"
          className="form-control no-br"
          placeholder="Login"
          value={username}
          onChange={this.props.onChange}
        />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          className="form-control no-br"
          placeholder="Password"
          value={password}
          onChange={this.props.onChange}
        />
        <label htmlFor="inputPassword" className="sr-only">Verify password</label>
        <input
          type="password"
          name="password2"
          id="inputPassword2"
          className="form-control"
          placeholder="Verify password"
          value={password2}
          onChange={this.props.onChange}
        />
        {this.props.loginError
          ? <div className="text-center text-danger"> User with this email already exist </div>
          : <div></div>
        }
        {wrongPass
          ? <div className="text-center text-danger"> Passwords are different </div>
          : <div></div>
        }
        <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign up </button>
      </form>
    )
  }
}

SignUp.propTypes = {
  payload: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    wrongPass: PropTypes.bool.isRequired,
  }).isRequired,
  loginError: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SignUp
