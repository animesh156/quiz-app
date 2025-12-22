const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");

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
router.get("/", (req, res) => {
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


module.exports = router