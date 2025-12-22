const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");

var cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const quizRoute = require("./routes/quizRoute");
const scoreRoute = require("./routes/scoreRoute");
const leaderBoardRoute = require("./routes/leaderBoardRoute");
const healthRoute = require("./routes/healthRoute");

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

app.use("/api/quiz", quizRoute);
app.use("/api/user", userRoutes);
app.use("/api/score", scoreRoute);
app.use("/api/leaderboard", leaderBoardRoute);
app.use("/api/health", healthRoute);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
