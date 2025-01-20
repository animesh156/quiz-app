const express = require('express')
const router = express.Router()
const {addScore, getScore} = require('../controllers/scoreController')
const {protect} = require('../middleware/authMiddleware')



router.post('/',addScore)
router.get('/',getScore)


module.exports=router