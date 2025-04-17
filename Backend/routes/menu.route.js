import express from "express";
import {
  addMenu,
  updateMenu,
  deleteMenu,
  getAllMenus,
  getMenuById,
  getMenuByName,
  getMenuItemsByCategory
} from "../controller/menu.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
import { upload, setUploadFolder } from "../middleware/Multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("admin"), setUploadFolder("menuImages"), upload.single("menuImage"), addMenu);
router.put("/:id", isAuthenticated, isAdmin("admin"), setUploadFolder("menuImages"), upload.single("menuImage"), updateMenu);
router.delete("/:id", isAuthenticated, isAdmin("admin"), deleteMenu);
router.get("/", getAllMenus);
router.get("/:id", isAuthenticated , getMenuById);
router.get("/name/:name", getMenuByName);
router.get('/by-category/:category', getMenuItemsByCategory);

export default router;
