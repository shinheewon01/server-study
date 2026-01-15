import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Context Path 설정
app.use("/api/v1/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`서버 실행중 http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/v1/orders`);
});