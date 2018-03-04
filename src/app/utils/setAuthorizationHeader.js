import axios from 'axios'

// Create authorization bearer.
export default (token = null) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.authorization
  }
}
