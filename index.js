// 1. express 불러오기
const express = require("express");
const cors = require("cors");

// 2. 서버 객체 생성
const app = express();
app.use(cors());
app.use(express.json());

//DB연결
const db = require("./db");

// [GET] : 조회할께
app.get("/orders", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "DB 조회 실패" });
  }
});

//[POST] : 실행할께
app.post("/orders", async (req, res) => {
  const { product } = req.body;

  try {

    //중복체크
    const [exists] = await db.query(
      "SELECT id FROM orders WHERE product = ?",
      [product]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        success: false,
        message: "이미 존재하는 상품입니다",
      });
    }

    //저장
    const [result] = await db.query(
      "INSERT INTO orders (product, status) VALUES (?, ?)",
      [product, "배송대기"]
    );

    //조회
    const [rows] = await db.query(
      "SELECT * FROM orders WHERE id = ?",
      [result.insertId]
    );


    res.status(201).json({
      success: true,
      message: "주문 등록 성공",
      data: rows[0],
    });

  } catch (err) {

    if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            success: false,
            message: "이미 등록된 상품입니다",
        });
    }

    res.status(500).json({
      success: false,
      message: "서버 오류",
    });   
}
});





// 서버 실행
app.listen(3000, () => {
  console.log("서버 실행중 http://localhost:3000");
});
