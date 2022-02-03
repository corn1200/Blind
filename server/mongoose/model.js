const mongoose = require("mongoose");
const schema = require("./schema");

// express와 mongoDB 연동 객체를 생성합니다
const db = mongoose.connection;
const model = () => {
  // 에러 및 연결 시 콜백을 설정합니다
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  mongoose.connect();

  // 스키마 연결
  const model = {};
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }
  return model;
};

// model이 require 되었을 때 model을 반환합니다
module.exports = model;
