import LoginPage from '../pageObjects/login.page'

describe('Login page', () => {
  it('should submit form', () => {
    LoginPage.open('/login')
  })
})
