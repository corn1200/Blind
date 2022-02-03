// 사용자
const mongoose = require("mongoose");
// 암호화 라이브러리
const crypto = require("crypto");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  createAt: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});

// password 가상 선택자
User.virtual("password").set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
});

// salt 생성 함수
User.method("makeSalt", () => {
  return Math.round(new Date().valueOf() * Math.random()) + "*";
});

// 해시 된 비밀번호 생성 함수
User.method("encryptPassword", function (plainPassword) {
  return crypto
    .createHmac("sha256", this.salt)
    .update(plainPassword)
    .digest("hex");
});

// 사용자 인증 함수
User.method("authenticate", function (plainPassword) {
  const inputPassword = this.encryptPassword(plainPassword);
  return inputPassword === this.hashedPassword;
});

module.exports = User;
