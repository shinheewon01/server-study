import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Atlas 연결 성공 🎉");
  } catch (err) {
    console.error("DB 연결 실패 ❌", err);
    process.exit(1);
  }
};

export default connectDB;