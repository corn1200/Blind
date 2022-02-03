// 사용자
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  createAt: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
});

module.exports = User;
