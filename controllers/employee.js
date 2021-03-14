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

router.delete('/:nik', async (req, res, next) => {
  try {
    const params = req.params.nik
    const sql = await `delete from employee where nik = ?`
    
    return await conn.query(sql, [params], (err, result) => {
      if (err) return console.log(err)

      // conditions if there are no corresponding lines
      if (result.affectedRows == 0) return res.status(401).json({
        message: "no employee has a NIK number like this"
      })

      res.status(200).json({ 
        message: 'managed to delete the employee'
      })
    })
  }
  catch(err) {
    console.log(err)
  }
})

module.exports = router