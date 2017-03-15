const Browser = require('zombie')
const mocha = require('mocha')

const describe = mocha.describe
const beforeEach = mocha.beforeEach
const it = mocha.it

Browser.localhost('localhost', 3000)

describe('User visits login page', () => {
  const browser = new Browser()

  beforeEach(() => browser.visit('/'))

  describe('enters valid credentials', () => {
    beforeEach(() => {
      browser.fill('username', 'admin')
        .fill('password', 'admin')
      return browser.pressButton('Login')
    })

    it('then should be redirected to home page', () => {
      browser.assert.url({ pathname: '/home' })
    })
  })

  describe('enters invalid credentials', () => {
    beforeEach(() => {
      browser.fill('username', 'invalid')
        .fill('password', 'invalid')
      return browser.pressButton('Login')
    })

    it('then should be redirected to login page', () => {
      browser.assert.url({ pathname: '/' })
    })
  })
})
