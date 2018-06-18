var jsonServer = require('json-server')
var bodyParser = require('body-parser')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.json())

function auth(req, res) {
  if (req.param('email') == 'admin@example.com') {
    res.jsonp({
      code: 'success',
      token: 'abcdefg12345'
    })
    return
  }
  res.sendStatus(400)
}

server.post('/login', auth)

server.post('/register', auth)

server.use(router)
server.listen(8888, function() {
  console.log('JSON Server is running')
})
