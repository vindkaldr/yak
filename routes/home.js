var express = require('express')
var router = express.Router()

router.get('/', (request, response) => {
  if (request.session.loggedIn) {
    response.render('home', { title: 'home' })
  } else {
    response.redirect('/')
  }
})

module.exports = router
