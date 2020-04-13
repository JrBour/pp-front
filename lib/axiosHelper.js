import axios from 'axios'
import Cookies from 'js-cookie'

const axiosHelper = async (config) => {
  const cookie = Cookies.get('token')

  const configuration = {
    method: 'get',
    baseURL: 'http://localhost/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie ? `Bearer ${cookie}` : null
    },
    ...config
  }

  return await axios(configuration)
}

export default axiosHelper
