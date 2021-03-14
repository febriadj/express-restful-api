const mysql = require('mysql')
const table = require('./db_table')

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

conn.connect(err => {
  if (err) return console.log(err)

  table.employee()
    .then(sql => conn.query(sql, err => err ? console.log(err) : null))
    .catch(err => console.log(err))

  table.employee_details()
    .then(sql => conn.query(sql, err => err ? console.log(err) : null))
    .catch(err => console.log(err))

  console.log('mysql connected')
})

module.exports = conn