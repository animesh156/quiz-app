const express = require('express')
const router = express.Router()
const {addScore, getScore} = require('../controllers/scoreController')



router.post('/',addScore)
router.get('/',getScore)


module.exports=router