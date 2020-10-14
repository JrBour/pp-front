class Page {
  open(path = '/') {
    browser.url(path)
  }
}

export default new Page()
