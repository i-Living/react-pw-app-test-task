import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/login-form.css'

class SignUp extends Component {

  render() {
    const { email, username, password } = this.props.payload
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
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={this.props.onChange}
        />
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
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SignUp
