const 
  router = require('express').Router(),
  conn = require('../config/db_conn')

router.get('/', async (req, res, next) => {
  return await conn.query('SELECT * FROM employee', (err, result) => {
    if (err) return new Error(err)

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
    const sql = `INSERT INTO employee VALUES (
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
      const sql = `INSERT INTO employee_details (nik_employee, full_name, join_date)
        VALUES (${result.insertId}, '${fullname}', null)
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
      .catch(err => new Error(err))
  })
  .catch(err => new Error(err))
})

router.put('/:nik', async (req, res, next) => {
  const params = req.params.nik
  const { first_name, last_name, position, date_of_birth, gender, residence, salary } = req.body

  // update all data from the two primary tables and child tables
  const updateEmployee = () => new Promise((resolve, reject) => {
    const sql = `UPDATE employee
      SET first_name = ?, last_name = ?, position = ?
      WHERE nik = ${params}
    `

    return conn.query(sql, [first_name, last_name, position], err => {
      if (err) return reject(err)
      resolve('successfully updated employee data')
    })
  })

  const updateDetails = () => new Promise((resolve, reject) => {
    const sql = `UPDATE employee_details
    SET full_name = ?, date_of_birth = ?, gender = ?, residence = ?, salary = ?
    WHERE nik_employee = ${params}
    `
    // create a full name by combining the first name with the last name
    const fullname = first_name.concat(' ' + last_name)

    return conn.query(sql, [fullname, date_of_birth, gender, residence, salary], err => {
      if (err) return reject(err)
      resolve('successfully updated employee data')
    })
  })

  return await Promise.all([ updateEmployee(), updateDetails() ])
    .then(result => res.status(200).json({
      message: result[0]
    }))
    .catch(err => new Error(err))
})

router.delete('/:nik', async (req, res, next) => {
  try {
    const params = req.params.nik
    const sql = await `DELETE FROM employee WHERE nik = ?`
    
    return await conn.query(sql, [params], (err, result) => {
      if (err) return new Error(err)

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
    return console.log(err)
  }
})

module.exports = router