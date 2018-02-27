import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <header className="App-header">
          {!this.props.logged
            ? (
              <div className="">
                <h4>PW Application</h4>
                {(this.props.location.pathname === "/sign-in" || this.props.location.pathname === "/sign-up")
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
                  {this.props.payload.name && <h5>{this.props.payload.name}: {this.props.payload.balance}</h5>}
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

export default Header
