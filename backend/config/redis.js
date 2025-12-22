const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});

redisClient.on("connect", () => {
  console.log("✅ Redis Cloud connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
