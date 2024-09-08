const express = require('express')
const router = express.Router()
const {getScore,addScore, updateScore} = require('../controllers/scoreController')


router.get('/',getScore)
router.post('/',addScore)


module.exports=router