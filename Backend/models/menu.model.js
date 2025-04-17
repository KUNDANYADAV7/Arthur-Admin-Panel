import mongoose from "mongoose";
const { Schema } = mongoose;

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  // price: { type: Schema.Types.Mixed, required: true }, 
  originalPrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  image: { type: String, required: true },
  saleDescription: { type: String, default: null }, // ✅ New field added
}, { timestamps: true });

export const Menu = mongoose.model("Menu", menuSchema);
