const express = require('express')
const session = require('express-session')
const httpStatus = require('http-status-codes')

const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const login = require('./routes/login')
const home = require('./routes/home')

const app = express()

const setupTemplateEngine = (app) => {
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'pug')
}

const setupSessionStore = (app) => {
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
}

const setupLogger = (app) => {
  app.use(logger('dev'))
}

const setupRequestBodyParser = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
}

const setupRedirectFilterForUnanuthenticedUsers = (app) => {
  app.all(/.*/, (request, response, next) => {
    if (request.path === '/' || request.path === '/login' || request.session.loggedIn) {
      next()
    } else {
      response.redirect('/')
    }
  })
}

const setupStaticFileServing = (app) => {
  app.use(express.static(path.join(__dirname, 'public')))
}

const setupRouters = (app) => {
  app.use('/', login)
  app.use('/home', home)
}

const setupHandlerForNotFoundResource = (app) => {
  app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = httpStatus.NOT_FOUND
    next(err)
  })
}

const setupErrorHandler = (app) => {
  app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    res.render('error')
  })
}

setupTemplateEngine(app)
setupSessionStore(app)
setupLogger(app)

setupRequestBodyParser(app)
setupStaticFileServing(app)
setupRedirectFilterForUnanuthenticedUsers(app)
setupRouters(app)

setupHandlerForNotFoundResource(app)
setupErrorHandler(app)

module.exports = app
