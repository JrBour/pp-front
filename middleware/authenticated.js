export default ({ res, req }) => {
  if (!req.headers.cookie.includes('token')) {
    return res.redirect('/')
  }
}
