const asyncHandler = require("express-async-handler");

const Score = require("../model/scoreModel");

const leaderBoard = asyncHandler(async (req, res) => {
  try {
    const leaderBoardData = await Score.find().sort({ score: -1 }).limit(10);

    res.status(200).json(leaderBoardData);
  } catch (error) {
    res.status(500).json({ message: "error fetching leaderboard data" });
  }
});

module.exports = {
  leaderBoard,
};
