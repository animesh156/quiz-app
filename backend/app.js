const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const quizRoute = require("./routes/quizRoute");
const scoreRoute = require("./routes/scoreRoute");
const leaderBoardRoute = require("./routes/leaderBoardRoute");
const healthRoute = require("./routes/healthRoute");

const app = express();

// DB connect (important: only once)
connectDB();

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/quiz", quizRoute);
app.use("/api/user", userRoutes);
app.use("/api/score", scoreRoute);
app.use("/api/leaderboard", leaderBoardRoute);
app.use("/api/health", healthRoute);

module.exports = app;
