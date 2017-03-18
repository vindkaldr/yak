var express = require('express')
var router = express.Router()

router.get('/', (request, response) => {
  response.render('home', { title: 'home' })
})

module.exports = router
