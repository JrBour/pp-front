import Cookies from 'js-cookie'

export default ({ redirect, store, req }) => {
  const cookie = process.server
    ? req.headers.cookie.includes('token')
    : Cookies.get('token')

  if (store.state.jwt === null && cookie) {
    store.commit('addJwt', Cookies.get('token'))
    return
  }

  if (store.state.jwt === null && !cookie) {
    return redirect('/login')
  }
}
