const express = require("express");
const router = express.Router();
const { User } = require("../mongoose/model");

// 로그인 요청
router.get("/user", async (req, res) => {
  const { email, password } = req.body;

  // 해당 이메일의 유저가 존재 하는지 확인합니다
  const loginUser = await User.find({ email: email });
  if (!loginUser._id) {
    return res.send({
      error: true,
      msg: "존재하지 않는 이메일",
    });
  }

  // 비밀번호 일치 여부를 확인합니다
  const correctPassword = await loginUser.authenticate(password);
  if (!correctPassword) {
    return res.send({
      error: true,
      msg: "비밀번호 불일치",
    });
  }

  // 공개 돼선 안될 비밀번호, salt 등의 정보를 제외하고 전송합니다
  res.send({ email: loginUser.email, nickname: loginUser.nickname });
});

module.exports = router;
