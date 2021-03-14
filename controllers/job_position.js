const
  router = require('express').Router(),
  conn = require('../config/db_conn')

router.get('/:job', async (req, res, next) => {
  const params = req.params.job
  const sql = await `select * from employee join employee_details
    on employee.nik = employee_details.nik_employee
    where employee.position like '%${params}%'
  `

  return await conn.query(sql, (err, result) => {
    if (err) return new Error(err)

    // displays employees with job positions related to params
    res.status(200).json(result)
  })
})

module.exports = router