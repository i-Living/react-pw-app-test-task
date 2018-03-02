import React from "react"
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

class HomePage extends React.Component {
  render() {
    const { isAuthenticated } = this.props
    return (
        <div className="home-page text-center container">
          <h3>Welcom to Parrot Wings application</h3>
          {isAuthenticated ? (
            <Link to="/transaction">Go to new transaction</Link>
          ) : (
            <div>
              <Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link>
            </div>
          )}
        </div>
    )
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default HomePage
