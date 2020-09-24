import Cookies from 'js-cookie'
import Vue from 'vue'
import axios from 'axios'

export default ({ $axios, env }, inject) => {
  const cookie = Cookies.get('token')
  const api = $axios.create({
    baseURL: env.TEST_API,
    headers: {
      common: {
        'Content-Type': 'application/json',
        Authorization: cookie ? `Bearer ${cookie}` : null
      }
    }
  })

  inject('axios', api)
}

axios.interceptors.response.use(
  (response) => {
    // Do something before request is sent
    return response
  },
  function(error) {
    if (
      error?.response?.status === 401 &&
      error?.response?.data.message === 'Expired JWT Token'
    ) {
      Cookies.remove('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

Vue.use(axios)
