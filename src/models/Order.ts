import mongoose, { Document, Schema } from "mongoose";

// 인터페이스
export interface IOrder extends Document {
  product: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// 스키마
const OrderSchema = new Schema<IOrder>(
  {
    product: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "배송대기",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// 모델 생성
const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;