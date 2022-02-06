// 회사
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, required: true },
  imgAddress: { type: String, default: null },
  reviewScore: { type: Number, default: 3, required: true },
  realtimeScore: { type: Number, default: 0 },
  // TODO: 자주 바뀌는 데이터는 따로 빼두는게 효율적입니다
  // 계속 IO가 발생하는 실시간 검색 데이터 및 
  // 리뷰 데이터는 스키마를 분리해야 합니다
});

module.exports = Company;
