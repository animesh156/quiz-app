const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const { protect } = require("./middleware/authMiddleware");
var cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const quizRoute = require("./routes/quizRoute");
const scoreRoute = require("./routes/scoreRoute");
const leaderBoardRoute = require("./routes/leaderBoardRoute");
connectDB();

app.use(
  cors({
    origin: "https://quiz-app-frontend-blush.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}h ${mins}m ${secs}s`;
}

function getISTTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
}

//  Health check endpoint
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const status = dbState === 1 ? "healthy" : "unhealthy";

  const uptimeInSeconds = process.uptime();

  res.status(status === "healthy" ? 200 : 500).json({
    status,
    timestampIST: getISTTimestamp(),
    uptime: formatUptime(uptimeInSeconds),
    database: {
      state: dbState,
      description: dbState === 1 ? "Connected" : "Not Connected ❌",
    },
  });
});

app.use("/api/quiz", quizRoute);
app.use("/api/user", userRoutes);
app.use("/api/score", scoreRoute);
app.use("/api/leaderboard", leaderBoardRoute);
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
