const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.render('login', { title: 'login' })
})

router.post('/login', (request, response) => {
  let loginData = request.body
  if (!loginData.username || !loginData.password) {
    response.redirect('/')
  } else if (loginData.username === 'admin' && loginData.password === 'admin') {
    request.session.loggedIn = true
    response.redirect('/home')
  } else {
    response.redirect('/')
  }
})

router.post('/logout', (request, response) => {
  request.session.loggedIn = false
  response.redirect('/')
})

module.exports = router
