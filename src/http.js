import axios from 'axios'

export let http = axios.create({
  baseURL:
    process.env.NODE_ENV == 'production' ? '/api' : 'http://localhost:8000/api'
})

export function setToken(val) {
  http.defaults.headers = { Authorization: 'Bearer ' + val }
}
