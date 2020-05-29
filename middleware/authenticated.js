import Cookies from 'js-cookie'
import parseJwt from '../utils/token'

export default ({ redirect, store, req }) => {
  const cookieServer = process.server
    ? req.headers.cookie.split(';').find((header) => header.includes('token'))
    : null

  const cookie = process.server
    ? cookieServer
      ? cookieServer.split('=')[1]
      : null
    : Cookies.get('token')

  if (store.state.jwt === null && cookie && cookie !== null) {
    store.commit('addJwt', cookie)
    store.commit('addUser', parseJwt(cookie).user)

    return
  }

  if (
    store.state.jwt !== null &&
    cookie &&
    cookie !== null &&
    store.state.user === null
  ) {
    store.commit('addUser', parseJwt(cookie).user)
  }

  if (store.state.jwt === null && !cookie) {
    return redirect('/login')
  }
}
