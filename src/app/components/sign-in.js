import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/login-form.css'

class SignIn extends Component {
  render() {
    const { email, password } = this.props.payload
    return (
      <form className="form-signin text-left" onSubmit={this.props.onSubmit}>
        <label htmlFor="inputEmail" className="form-label">Email address</label>
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
        {this.props.emptyFields.email && <div className="form-input-error"> Email is required </div>}
        <label htmlFor="inputPassword" className="form-label">Password</label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={this.props.onChange}
        />
        {this.props.emptyFields.password && <div className="form-input-error"> Passwords is required </div>}
        {this.props.loginError && <div className="form-input-error"> {this.props.loginError} </div>}
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
  emptyFields: PropTypes.shape({
    email: PropTypes.bool.isRequired,
    password: PropTypes.bool.isRequired,
  }).isRequired,
  loginError: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SignIn
