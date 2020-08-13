import axios from 'axios'
import Cookies from 'js-cookie'

const axiosHelper = async (config) => {
  const cookie = Cookies.get('token')
  const configuration = {
    method: 'get',
    baseURL: process.env.NUXT_ENV_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie ? `Bearer ${cookie}` : null
    },
    ...JSON.parse(JSON.stringify(config))
  }

  return await axios(configuration)
}

export default axiosHelper
