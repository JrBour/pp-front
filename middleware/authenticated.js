import Cookies from 'js-cookie'
import parseJwt from '../utils/token'

export default ({ redirect, store, req }) => {
  const cookie = process.server
    ? req && req.header && req.header.cookie
      ? req.headers.cookie.includes('token')
      : null
    : Cookies.get('token')

  if (store.state.jwt === null && cookie) {
    store.commit('addJwt', Cookies.get('token'))
    store.commit('addCurrentUser', parseJwt(Cookies.get('token')).user)

    return
  }

  if (store.state.jwt !== null && cookie && store.state.currentUser === null) {
    store.commit('addCurrentUser', parseJwt(Cookies.get('token')).user)

    return
  }

  if (store.state.jwt === null && !cookie) {
    return redirect('/login')
  }
}
