const Score = require("../model/scoreModel");
const redisClient = require("../config/redis");

const CACHE_KEY = "leaderboard:top10";
const CACHE_TTL = 30; // seconds

const leaderBoard = async (req, res) => {
  try {
    const cached = await redisClient.get(CACHE_KEY);

    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const leaderBoardData = await Score.find()
      .sort({ score: -1 })
      .limit(10)
      .select("-_id -user");

    if (!leaderBoardData.length) {
      return res.status(200).json([]);
    }

    await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(leaderBoardData));

    res.status(200).json(leaderBoardData);
  } catch (error) {
    res.status(500).json({ message: "error fetching leaderboard data" });
    console.log(error)
  }
};

module.exports = {
  leaderBoard,
};
