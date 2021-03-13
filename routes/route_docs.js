const 
  router = require('express').Router(),
  fs = require('fs')

router.get('/', async (req, res, next) => {
  return await fs.readFile('./routes/route_docs.json', 'utf-8', (err, file) => {
    if (err) return console.log(err)
    
    res.status(200).json(JSON.parse(file))
  })
})

module.exports = router