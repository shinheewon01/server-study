import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";
import connectDB from "./db"; 

const app = express();
const PORT = process.env.PORT;

app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());

// Context Path 설정
app.use("/api/v1/orders", ordersRouter);

// DB 연결
const startServer = async () => {
  try {
    await connectDB(); // DB 연결 대기
    app.listen(PORT, () => {
      console.log(`서버 실행중 http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/api/v1/orders`);
    });
  } catch (err) {
    console.error("서버 시작 실패:", err);
    process.exit(1);
  }
};

startServer();