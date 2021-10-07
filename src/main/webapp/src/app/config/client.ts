import axios from "axios";

const client = axios.create({
  withCredentials: true,
})

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : '/'

client.defaults.headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}

export default client;