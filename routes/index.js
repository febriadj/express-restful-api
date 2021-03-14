const router = require('express').Router()

router.use(require('./route_docs'))

router.use('/employee', require('../controllers/employee'))
router.use('/employee', require('../controllers/employee_details'))

router.use('/employee/position', require('../controllers/job_position'))

module.exports = router