import mongoose from "mongoose";

const popularChoiceSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
    },
    adminPhoto: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const PopularChoice = mongoose.model("PopularChoice", popularChoiceSchema);
