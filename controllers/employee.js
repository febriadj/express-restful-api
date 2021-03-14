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

  const insertEmployee = () => new Promise((resolve, reject) => {
    const sql = `insert into employee values (
      0, '${first_name}', '${last_name}', '${position}'
    )`

    conn.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })

  // create a full name by combining the first name with the last name
  const fullname = first_name.concat(' ' + last_name)

  insertEmployee().then(result => {
    // enter data into child tables
    const insertDetails = () => new Promise((resolve, reject) => {
      const sql = `insert into employee_details (nik_employee, full_name, join_date)
        values (${result.insertId}, '${fullname}', null)
      `

      conn.query(sql, err => {
        if (err) return reject(err)

        resolve(res.status(200).json({ 
          status: 200, 
          message: 'managed to add employees' 
        }))
      })
    })

    // run the function for the insert section of employee_details
    insertDetails()
      .then(result => result)
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router