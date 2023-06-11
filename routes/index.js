const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const records = require('./modules/records')
const home = require('./modules/home')

router.use( '/users' , users )
router.use( '/records' , records )
router.use( '/' , home )


module.exports = router