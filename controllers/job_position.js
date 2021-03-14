const
  router = require('express').Router(),
  conn = require('../config/db_conn')

router.get('/:job', async (req, res, next) => {
  const params = req.params.job
  const sql = await `SELECT * FROM employee JOIN employee_details
    ON employee.nik = employee_details.nik_employee
    WHERE employee.position LIKE '%${params}%'
  `

  return await conn.query(sql, (err, result) => {
    if (err) return new Error(err)

    // displays employees with job positions related to params
    res.status(200).json(result)
  })
})

module.exports = router