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

// 게시글 수정하기
router.patch("/article/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updateArticle = await Article.findOneAndUpdate(
    { _id: id, author: author },
    { content: content },
    { new: true }
  );
  res.send(updateArticle);
});

// 게시글 DB에서 삭제하기(HARD DELETE)
router.delete("/article/delete/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.deleteOne({
    _id: id,
    author: author,
  });
  res.send(deletedArticle);
});

// 게시글 삭제 상태로 만들기(SOFT DELETE)
router.delete("/article/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author: author,
    },
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    }
  );
  res.send(deletedArticle);
});

module.exports = router;
