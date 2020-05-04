import axios from 'axios'
import Cookies from 'js-cookie'

const axiosHelper = async (config) => {
  const cookie = Cookies.get('token')
  const configuration = {
    method: 'get',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie ? `Bearer ${cookie}` : null
    },
    ...config
  }

  return await axios(configuration)
}

export default axiosHelper
