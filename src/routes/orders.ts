import { Router, Request, Response } from "express";
import Order from "../models/Order"; 

const router = Router();

interface OrderRequestBody {
  product: string;
}

// [GET] : 조회
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
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
      const exists = await Order.findOne({ product }); // ⭐ MongoDB 쿼리

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "이미 존재하는 상품입니다",
        });
      }

      // 2. 등록
      const newOrder = await Order.create({
        product,
        status: "배송대기",
      }); // ⭐ MongoDB insert

      res.status(201).json({
        success: true,
        message: "주문 등록 성공",
        data: newOrder,
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