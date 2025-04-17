import express from "express";
import {
  createMenuCategory,
  deleteMenuCategory,
  getAllMenuCategories,
  getMyMenuCategories,
  getSingleMenuCategory,
  updateMenuCategory,
} from "../controller/menucategory.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
import { upload, setUploadFolder } from "../middleware/Multer.js";

const router = express.Router();

// Route to create a new menu category
router.post(
  "/create",
  isAuthenticated,
  isAdmin("admin"),
  setUploadFolder("menuCategoryImages"),
  upload.single("photo"), 
  createMenuCategory
);

// Route to delete a menu category
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteMenuCategory);

// Route to get all menu categories
router.get("/all-menu-categories", getAllMenuCategories);

// Route to get a single menu category by ID
router.get("/single-menu-category/:id", isAuthenticated, getSingleMenuCategory);

// Route to get the menu categories created by the authenticated user (admin)
router.get("/my-menu-categories", isAuthenticated, isAdmin("admin"), getMyMenuCategories);



// Route to update a menu category
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin("admin"),
  setUploadFolder("menuCategoryImages"),
  upload.single("photo"), 
  updateMenuCategory
);

export default router;
