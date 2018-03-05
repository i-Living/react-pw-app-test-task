import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/login-form.css'

class SignUp extends Component {

  render() {
    const { email, username, password, password2 } = this.props.payload
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
          required
        />
        {this.props.loginError && <div className="form-input-error"> {this.props.loginError} </div>}
        {this.props.emptyFields.email && <div className="form-input-error">Email is required</div>}
        <label htmlFor="inputLogin" className="form-label mt-2">Login</label>
        <input
          type="text"
          name="username"
          id="inputLogin"
          className="form-control no-br"
          placeholder="Login"
          value={username}
          onChange={this.props.onChange}
        />
        {this.props.emptyFields.username && <div className="form-input-error">Login is required</div>}
        <label htmlFor="inputPassword" className="form-label mt-2">Password</label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          className="form-control no-br"
          placeholder="Password"
          value={password}
          onChange={this.props.onChange}
        />
        {this.props.payload.wrongPass && <div className="form-input-error">Passwords are different</div>}
        {this.props.emptyFields.password && <div className="form-input-error">Passwords is required</div>}
        <label htmlFor="inputPassword2" className="form-label mt-2">Confirm password</label>
        <input
          type="password"
          name="password2"
          id="inputPassword2"
          className="form-control"
          placeholder="Confirm password"
          value={password2}
          onChange={this.props.onChange}
        />
        {this.props.payload.wrongPass && <div className="form-input-error">Passwords are different</div>}
        {this.props.emptyFields.password2 && <div className="form-input-error">Password confirm is required</div>}
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
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
  emptyFields: PropTypes.shape({
    email: PropTypes.bool.isRequired,
    username: PropTypes.bool.isRequired,
    password: PropTypes.bool.isRequired,
    password2: PropTypes.bool.isRequired,
  }).isRequired,
  loginError: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SignUp
