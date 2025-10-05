const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const { protect } = require("./middleware/authMiddleware");
var cors = require("cors");

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
app.use("/api/quiz", quizRoute);
app.use("/api/user", userRoutes);
app.use("/api/score", scoreRoute);
app.use("/api/leaderboard", leaderBoardRoute);
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
