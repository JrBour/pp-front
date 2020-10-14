import Page from './main.page'

class LoginPage extends Page {
  get mail() {
    return $("input[type='mail']")
  }

  get password() {
    return $("input[type='password']")
  }
}

export default new LoginPage()
