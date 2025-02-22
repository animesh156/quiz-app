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
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/quiz", quizRoute);
app.use("/user", userRoutes);
app.use("/score", scoreRoute);
app.use("/leaderboard", leaderBoardRoute);
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
