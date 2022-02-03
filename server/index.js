const express = require("express");
// Cros Origin Resource Sharing 문제를 해결해 주는 라이브러리입니다
const cors = require("cors");
const API = require("./api");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// POST 요청이 들어올 때 req.body에 전송되는 데이터를 담고
// express에서 엑세스를 할 수 있게 해주는 코드입니다
app.use(express.urlencoded({ extended: true }));

// s: 라우트 작성
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/article/:id", API.getArticle);
// e: 라우트 작성

app.listen(PORT, "localhost", () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
