const express = require("express");
const router = express.Router();
const { Article, Comment } = require("../mongoose/model");

// 개별 게시글 가져오는 라우트
router.get("/article/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  const comment = await Comment.find({ article: id });
  res.send({ article, comment });
});

// 게시글 추가
router.post("/article/create", async (req, res) => {
  const { author, title, content, board } = req.body;
  const newArticle = await Article({ author, title, content, board }).save();
  res.send(newArticle);
});

module.exports = router;
