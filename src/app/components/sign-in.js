import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/login-form.css'

class SignIn extends Component {
  render() {
    const { email, password } = this.props.payload
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
        <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in </button>
      </form>
    )
  }
}

SignIn.propTypes = {
  payload: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SignIn
