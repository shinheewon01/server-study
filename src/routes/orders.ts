import { Router, Request, Response } from "express";
import mysql from "mysql2/promise";
import db from "../db";

const router = Router();

interface OrderRequestBody {
  product: string;
}

// [GET] : 조회
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB 조회 실패" });
  }
});

// [POST] : 등록
router.post(
  "/",
  async (req: Request<{}, {}, OrderRequestBody>, res: Response) => {
    const { product } = req.body;

    if (!product || product.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "상품명을 입력해주세요",
      });
    }

    try {
      // 1. 중복체크
      const [exists] = await db.query<mysql.RowDataPacket[]>(
        "SELECT id FROM orders WHERE product = ?",
        [product]
      );

      if (exists.length > 0) {
        return res.status(409).json({
          success: false,
          message: "이미 존재하는 상품입니다",
        });
      }

      // 2. 등록
      const [result] = await db.query<mysql.ResultSetHeader>(
        "INSERT INTO orders (product, status) VALUES (?, ?)",
        [product, "배송대기"]
      );

      // 3. 등록된 데이터 조회
      const [rows] = await db.query<mysql.RowDataPacket[]>(
        "SELECT * FROM orders WHERE id = ?",
        [result.insertId]
      );

      res.status(201).json({
        success: true,
        message: "주문 등록 성공",
        data: rows[0],
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "서버 오류",
      });
    }
  }
);

export default router;
