const Page = require('./main.page')

class LoginPage extends Page {
  get mail() {
    return $("input[type='mail']")
  }

  get password() {
    return $("input[type='password']")
  }
}

module.exports = new LoginPage()
