const express = require('express')
const { Register } = require('../controllers/controller')
const router = express.Router()



router.post('/signup', Register)


module.exports = router