const 
  router = require('express').Router(),
  conn = require('../config/db_conn')

router.get('/:nik', async (req, res, next) => {
  try {
    const params = req.params.nik
    const sql = await `SELECT * FROM employee JOIN employee_details
      ON employee.nik = employee_details.nik_employee WHERE employee.nik = ?
    `
  
    return await conn.query(sql, [params], (err, result) => {
      if (err) return new Error(err)
      
      res.status(200).json(result)
    })
  }
  catch(err) {
    res.status(500).json({ 
      status: 'internal server error',
      code: 500,
      message: err
    })
  }
})

module.exports = router
