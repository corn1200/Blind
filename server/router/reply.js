const express = require("express");
const router = express.Router();
const { Reply } = require("../mongoose/model");

// 대댓글 생성하기
router.post("/reply/create", async (req, res) => {
  const { author, comment, content } = req.body;
  const newReply = await Reply({ author, comment, content }).save();
  res.send(newReply._id ? true : false);
});

// 대댓글 수정하기
router.patch("/reply/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updateReply = await Reply.findOneAndUpdate(
    { _id: id, author: author },
    { content: content },
    { new: true }
  );
  res.send(updateReply);
});

// 대댓글 DB에서 삭제하기(HARD DELETE)
router.delete("/reply/delete/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.deleteOne({
    _id: id,
    author: author,
  });
  res.send(deletedReply);
});

// 대댓글 삭제 상태 만들기(SOFT DELETE)
router.delete("/reply/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.findOneAndUpdate(
    {
      _id: id,
      author: author,
    },
    // 30일 후에 삭제합니다
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    }
  );
  res.send(deletedReply);
});

module.exports = router;
