const express = require("express");
const router = express.Router();
const { leaderBoard } = require("../controllers/leaderBoardController");

router.get("/", leaderBoard);

module.exports = router;
