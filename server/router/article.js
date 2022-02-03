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

module.exports = router;
