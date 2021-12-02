import { Schema, model, models } from "mongoose";

export const orderSchema = new Schema({
  order_id: { type: String },
  amount: { type: Number },
  amount_shipping: { type: Number },
  images: { type: Array },
  timestamp: { type: Date },
  user: { type: String },
});

export const Order = models.Order || model("Order", orderSchema);
