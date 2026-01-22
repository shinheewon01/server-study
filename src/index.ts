import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";
import connectDB from "./db"; 

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Context Path 설정
app.use("/v1/orders", ordersRouter);

// DB 연결
const startServer = async () => {
  try {
    await connectDB(); // DB 연결 대기
    app.listen(PORT, () => {
      console.log(`서버 실행중 http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/v1/orders`);
    });
  } catch (err) {
    console.error("서버 시작 실패:", err);
    process.exit(1);
  }
};

startServer();