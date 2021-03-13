const 
  router = require('express').Router(),
  conn = require('../config/db_conn')

router.get('/', async (req, res, next) => {
  return await conn.query('select * from employee', (err, result) => {
    if (err) return console.log(err)

    res.status(200).json(result)
  })
})

router.post('/', async (req, res, next) => {
  const { first_name, last_name, position } = req.body

  if (first_name, last_name, position == undefined || null) {
    return await res.status(401).json({ 
      status: 401, 
      message: 'the form cannot be blank' 
    })
  }

  // create a full name by combining the first name with the last name
  const fullname = first_name.concat(last_name)

  async function insertEmployee() {
    const sql = await `insert into employee values (
      0, '${first_name}', '${last_name}', '${position}'
    )`

    return await conn.query(sql, err => {
      if (err) return console.log(err)

      res.status(200).json({ 
        status: 200, 
        message: 'success' 
      })
    })
  }

  async function insertDetails() {
    const sql = await `insert into employee_details (nik_employee, full_name, join_date) values (
      0, '${fullname}', null
    )`

    return await conn.query(sql, err => {
      if (err) return console.log(err)

      res.status(200).json({ 
        status: 200, 
        message: 'success' 
      })
    })
  }

  Promise.all([ insertEmployee(), insertDetails() ])
    .then(result => result)
    .catch(err => err)
})

module.exports = router