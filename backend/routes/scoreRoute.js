const express = require('express')
const router = express.Router()
const {addScore} = require('../controllers/scoreController')



router.post('/',addScore)


module.exports=router