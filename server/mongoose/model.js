const mongoose = require("mongoose");
const schema = require("./schema");
// 환경변수가 담긴 파일을 활용할 수 있도록 합니다
require("dotenv").config();

// express와 mongoDB 연동 객체를 생성합니다
const db = mongoose.connection;
const model = (() => {
  // 에러 및 연결 시 콜백을 설정합니다
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qwmme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    // 몽구스 버전이 6.0 이상이라면 아래 옵션을 항상
    // true, true, true, false로 기억하고 실행하기 때문에
    // 더 이상 지원하지 않습니다
    // {
    //   useCreateIndex: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    // }
  );

  // 스키마 연결
  const model = {};
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }
  return model;
})();

// model이 require 되었을 때 model을 반환합니다
module.exports = model;
