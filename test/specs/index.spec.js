import Page from '../pageObjects/main.page'

describe('Example test', () => {
  it('should open correct app', () => {
    Page.open()
    expect(browser).toHaveTitle('test')
  })
})