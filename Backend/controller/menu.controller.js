import fs from "fs";
import path from "path";
import { Menu } from "../models/menu.model.js";

// Helper: Delete old image
const deleteOldImage = (imagePath) => {
  const fullPath = path.join("public", imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};


export const addMenu = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      onSale,
      originalPrice,
      saleDescription, // ✅ Accept saleDescription from req.body
    } = req.body;

    let imagePath = req.file ? `menuImages/${req.file.filename}` : null;

    const newMenu = new Menu({
      name,
      category,
      description,
      price,
      originalPrice: onSale === "true" ? originalPrice : null,
      onSale,
      saleDescription: onSale === "true" ? saleDescription : null, // ✅ Conditional assignment
      image: imagePath,
    });

    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: "Failed to add menu", error });
  }
};


export const updateMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const existingMenu = await Menu.findById(menuId);
    if (!existingMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const {
      name,
      category,
      description,
      price,
      onSale,
      originalPrice,
      saleDescription,
    } = req.body;

    // If a new image is uploaded
    if (req.file) {
      if (existingMenu.image) deleteOldImage(existingMenu.image);
      existingMenu.image = `menuImages/${req.file.filename}`;
    }

    // Update fields
    existingMenu.name = name;
    existingMenu.category = category;
    existingMenu.description = description;
    existingMenu.price = price;

    const isOnSale = onSale === "true";
    existingMenu.onSale = isOnSale;
    existingMenu.originalPrice = isOnSale ? originalPrice : null;
    existingMenu.saleDescription = isOnSale ? saleDescription : null;

    await existingMenu.save();
    res.status(200).json(existingMenu);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu", error });
  }
};


export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    if (menu.image) deleteOldImage(menu.image);
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu", error });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menus", error });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu", error });
  }
};


export const getMenuByName = async (req, res) => {
  try {
    const name = req.params.name.replace(/-/g, " "); // Convert slug to normal text
    const menus = await Menu.find({
      name: { $regex: new RegExp(`^${name}$`, 'i') } // case-insensitive exact match
    });

    if (menus.length === 0) {
      return res.status(404).json({ message: "No menus found with that name" });
    }

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menus", error });
  }
};


export const getMenuItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // category will be passed as a URL parameter

    // Basic validation to check if the category is provided
    if (!category || category.trim() === "") {
      return res.status(400).json({ message: "Category parameter is required" });
    }

    // Find all menu items that belong to the given category
    const menuItems = await Menu.find({
      category: { $regex: new RegExp(category, "i") }, // Case-insensitive match
    });

    // If no menu items are found for the given category
    // if (menuItems.length === 0) {
    //   return res.status(404).json({ message: `No items found for category "${category}"` });
    // }

        // If no menu items are found for the given category
        if (menuItems.length === 0) {
          return res.status(200).json({ message: `No items found for category "${category}"`, data: [] });
        }
    

    // Return the found menu items
    res.status(200).json(menuItems);
  } catch (err) {
    // Handle any server errors
    res.status(500).json({ message: "Server error", error: err.message });
  }
};