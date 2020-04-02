import axios from 'axios'
import Cookies from 'js-cookie'

const axiosHelper = async (config) => {
  const configuration = {
    method: 'get',
    baseURL: 'http://localhost/',
    headers: {
      'Content-Type': 'application/json',
      token: Cookies.get('jwt')
    },
    ...config
  }

  return await axios(configuration)
}

export default axiosHelper
