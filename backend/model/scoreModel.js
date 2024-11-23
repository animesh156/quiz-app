const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: { type: Number, required: true, default:0 },
  

  userName: {type: String}
});

module.exports = mongoose.model("Score", scoreSchema);
