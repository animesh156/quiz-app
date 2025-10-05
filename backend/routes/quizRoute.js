const express = require("express");
const router = express.Router();
const showQuiz = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, showQuiz);

module.exports = router;
