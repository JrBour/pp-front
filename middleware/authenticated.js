export default ({ redirect, req }) => {
  if (!req.headers.cookie.includes('token')) {
    return redirect('/login')
  }
}
