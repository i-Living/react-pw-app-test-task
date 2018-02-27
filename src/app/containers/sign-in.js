import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/login-form.css'

class SignIn extends Component {

  componentDidMount() {
    console.log(this.props.location)
  }
  render() {
    return (
      <div className="sign-in text-center container">
        <h3>
          Sign in /
          <Link to='/sign-up'> Sign up</Link>
        </h3>
        <form className="form-signin">
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" />
          <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in </button>
        </form>
      </div>
    )
  }
}

export default SignIn
