const 
  dotenv = require('dotenv').config({ path: './.env' }),
  bodyParser = require('body-parser'),
  app = require('express')(),
  conn = require('./config/db_conn'),
  port = 3000

app.use(bodyParser.urlencoded({ extended: false })),
app.use(bodyParser.json())

app.use(require('./routes/index'))

app.listen(port, () => console.log('localhost:' + port))