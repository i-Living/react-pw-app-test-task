import axios from 'axios'

const url = process.env.REACT_APP_API_URL

export default {
  user: {
    login: credentials =>
      axios.post(url + "/sessions/create", { ...credentials })
        .then(res => res.data)
        .catch(err => err),
    signup: user =>
      axios.post(url + "/users", { ...user })
        .then(res => res.data)
        .catch(err => err),
    get: () =>
      axios.get(url + "/api/protected/user-info")
        .then(res => res.data)
        .catch(err => err),
    filter: filter =>
      axios.post(url + "/api/protected/users/list", { filter } )
        .then(res => res.data)
        .catch(err => err),
  },
  transaction: {
    list: () =>
      axios.get(url + "/api/protected/transactions")
        .then(res => res.data)
        .catch(err => err),
    create: transaction =>
      axios.post(url + "/api/protected/transactions", {...transaction})
        .then(res => res.data)
        .catch(err => err)
  }
}
