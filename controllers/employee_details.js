const 
  router = require('express').Router(),
  conn = require('../config/db_conn')

router.get('/:nik', async (req, res, next) => {
  try {
    const params = req.params.nik
    const sql = await `select * from employee join employee_details
      on employee.nik = employee_details.nik_employee where employee.nik = ?
    `
  
    return await conn.query(sql, [params], (err, result) => {
      if (err) return new Error(err)
      
      res.status(200).json(result)
    })
  }
  catch(err) {
    return console.log(err)
  }
})

module.exports = router