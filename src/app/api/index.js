import axios from "axios"

const url = "http://193.124.114.46:3001"

export default {
  user: {
    login: credentials =>
      axios.post(url + "/sessions/create", { ...credentials }).then(res => res.data),
    signup: user =>
      axios.post(url + "/users", { ...user }).then(res => res.data)
  }
}
