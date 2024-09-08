const express = require('express')
const router = express.Router()
const showQuiz = require('../controllers/quizController')

router.get('', showQuiz)

module.exports = router