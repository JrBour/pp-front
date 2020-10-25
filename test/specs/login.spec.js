import LoginPage from '../pageObjects/login.page'

describe('Login page', () => {
  // it('should submit form', () => {
  //   LoginPage.open('/login')
  // })
  it('should redirect to register page', () => {
    LoginPage.open('/login')
    $('.login__link a').click()
    expect(browser.getUrl()).toBe('http://localhost:3000/register')
  })
})
