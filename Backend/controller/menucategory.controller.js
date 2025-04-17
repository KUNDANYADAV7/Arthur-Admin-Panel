import mongoose from "mongoose";
import { MenuCategory } from "../models/menucategory.model.js";
import fs from "fs";
import path from "path";

const handleImageDelete = (imagePath) => {
  const fullPath = path.join("public", imagePath);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createMenuCategory = async (req, res) => {
  try {
    const { title, price } = req.body;

    if (!req.file) return res.status(400).json({ message: "Menu category image is required" });
    if (!title?.trim()) return res.status(400).json({ message: "Category is required" });

    const trimmedTitle = title.trim();
    const exists = await MenuCategory.findOne({ title: trimmedTitle });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const imagePath = req.file.path.replace(/\\/g, "/").replace("public/", "");
    
    // Create the menu category, including the price if provided
    const menuCategory = await MenuCategory.create({
      title: trimmedTitle,
      photo: imagePath,
      price: price || null,  // Optional price field, will be null if not provided
      adminName: req.user?.name,
      adminPhoto: req.user?.photo,
      createdBy: req.user?._id,
    });

    res.status(201).json({ message: "Menu category created", menuCategory });
  } catch (err) {
    const isDuplicate = err.code === 11000;
    res.status(500).json({ message: isDuplicate ? "Duplicate title" : "Server error", error: err.message });
  }
};


export const deleteMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID" });

    const category = await MenuCategory.findById(id);
    if (!category) return res.status(404).json({ message: "Menu category not found" });

    if (category.photo) handleImageDelete(category.photo);

    await category.deleteOne();
    res.status(200).json({ message: "Menu category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllMenuCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getSingleMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID" });

    const category = await MenuCategory.findById(id);
    if (!category) return res.status(404).json({ message: "Menu category not found" });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyMenuCategories = async (req, res) => {
  try {
    const myCategories = await MenuCategory.find({ createdBy: req.user._id });
    res.status(200).json(myCategories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID" });

    const category = await MenuCategory.findById(id);
    if (!category) return res.status(404).json({ message: "Menu category not found" });

    const updateData = {};

    if (req.body.title) {
      const trimmedTitle = req.body.title.trim();
      const existing = await MenuCategory.findOne({ title: trimmedTitle });
      if (existing && existing._id.toString() !== id) {
        return res.status(400).json({ message: "Category already exists" });
      }
      updateData.title = trimmedTitle;
    }

    if (req.body.price !== undefined) {
      updateData.price = req.body.price || null;  // Update price if provided, default to null if not
    }

    if (req.file) {
      if (category.photo) handleImageDelete(category.photo);
      updateData.photo = req.file.path.replace(/\\/g, "/").replace("public/", "");
    }

    const updated = await MenuCategory.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Menu category updated", updatedMenuCategory: updated });
  } catch (err) {
    const isDuplicate = err.code === 11000;
    res.status(500).json({ message: isDuplicate ? "Duplicate Category" : "Server error", error: err.message });
  }
};


