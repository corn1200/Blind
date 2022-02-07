// 게시물
const mongoose = require("mongoose");
// 항목이 추가될 때 마다 자동으로 증가하는 필드를 제공하는 라이브러리
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const Article = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },

  // 동적으로 변동될 수 있는 데이터
  viewCount: { type: Number, default: 0 },
  thumbupCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  deleteTime: { type: Number, default: 0 },

  // (옵션): 사용자가 게시글에 추가할 수 있는 데이터
  articleImgAddress: { type: String },
  mention: { type: Schema.Types.ObjectId, ref: "Company" },
});

// Auto Increment할 필드를 생성합니다
Article.plugin(AutoIncrement, { inc_field: "key" });

module.exports = Article;
