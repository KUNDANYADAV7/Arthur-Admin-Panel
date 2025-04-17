import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { PopularChoice } from "../models/popularchoice.model.js";

// Create Popular Choice
export const createPopularChoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const createdBy = req.user?._id;
    const adminName = req.user?.name;
    const adminPhoto = req.user?.photo;

    const photoPath = req.file.path.replace(/\\/g, "/").replace("public/", "");

    const popularChoice = await PopularChoice.create({
      photo: photoPath,
      createdBy,
      adminName,
      adminPhoto,
    });

    res.status(201).json({ message: "Popular Choice created", popularChoice });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
};

// Get All Popular Choices
export const getAllPopularChoices = async (req, res) => {
  try {
    const choices = await PopularChoice.find().sort({ createdAt: -1 });
    res.status(200).json(choices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch choices", details: error.message });
  }
};

// Get Popular Choices by Current Admin
export const getMyPopularChoices = async (req, res) => {
  try {
    const createdBy = req.user?._id;
    const choices = await PopularChoice.find({ createdBy }).sort({ createdAt: -1 });
    res.status(200).json(choices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your choices", details: error.message });
  }
};

// Update Popular Choice
export const updatePopularChoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const choice = await PopularChoice.findById(id);
    if (!choice) {
      return res.status(404).json({ message: "Popular choice not found" });
    }

    const updateData = {};

    if (req.file) {
      const oldImagePath = choice.photo;
      if (oldImagePath) {
        const fullPath = path.join("public", oldImagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      updateData.photo = req.file.path.replace(/\\/g, "/").replace("public/", "");
    }

    const updatedChoice = await PopularChoice.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Popular choice updated", updatedChoice });
  } catch (error) {
    res.status(500).json({ message: "Failed to update choice", details: error.message });
  }
};

// Delete Popular Choice
export const deletePopularChoice = async (req, res) => {
  const { id } = req.params;

  try {
    const choice = await PopularChoice.findById(id);
    if (!choice) {
      return res.status(404).json({ message: "Popular choice not found" });
    }

    if (choice.photo) {
      const imagePath = path.join("public", choice.photo);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await choice.deleteOne();
    res.status(200).json({ message: "Popular choice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete choice", details: error.message });
  }
};


export const getPopularChoiceById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the popular choice by ID
    const popularChoice = await PopularChoice.findById(id);

    if (!popularChoice) {
      return res.status(404).json({ message: 'Popular Choice not found' });
    }

    // Return the popular choice
    return res.status(200).json(popularChoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};