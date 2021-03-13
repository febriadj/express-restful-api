const router = require('express').Router()

router.use(require('./route_docs'))

router.get('/date', (req, res) => {
  const date = new Date()
  
  res.json({ nik: date })
})

// routes anime
router.use('/employee', require('../controllers/employee'))

module.exports = router