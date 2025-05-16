import mongoose from "mongoose";
const { Schema } = mongoose;

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" }, // Description is optional
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  image: { type: String, required: true },
  saleDescription: { type: String, default: "" }, // Sale description is optional
}, { timestamps: true });

export const Menu = mongoose.model("Menu", menuSchema);

//new