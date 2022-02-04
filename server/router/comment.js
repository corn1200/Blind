const express = require("express");
const router = express.Router();
const { Comment } = require("../mongoose/model");

// 댓글 생성하기
router.post("/comment/create", async (req, res) => {
  const { author, article, content } = req.body;
  const newComment = await Comment({ author, article, content }).save();
  res.send(newComment._id ? true : false);
});

// 댓글 수정하기
router.patch("/comment/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updateComment = await Comment.findOneAndUpdate(
    { _id: id, author: author },
    { content: content },
    { new: true }
  );
  res.send(updateComment);
});

// 댓글 DB에서 삭제하기(HARD DELETE)
router.delete("/comment/delete/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.deleteOne({
    _id: id,
    author: author,
  });
  res.send(deletedComment);
});

// 댓글 삭제 상태로 만들기(SOFT DELETE)
router.delete("/comment/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author: author,
    },
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    }
  );
  res.send(deletedComment);
});

module.exports = router;
