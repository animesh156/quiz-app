const express = require("express");
const router = express.Router();
const { addScore, getScore } = require("../controllers/scoreController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addScore);
router.get("/", protect, getScore);

module.exports = router;
