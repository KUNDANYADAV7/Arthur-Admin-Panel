import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    photo: { type: String, required: true },
    price: { type: String }, 
    adminName: String,
    adminPhoto: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);
