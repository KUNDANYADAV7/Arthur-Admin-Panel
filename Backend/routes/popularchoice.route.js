import express from "express";
import {
  createPopularChoice,
  deletePopularChoice,
  getAllPopularChoices,
  getMyPopularChoices,
  updatePopularChoice,
  getPopularChoiceById
} from "../controller/popularchoice.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/authUser.js";
import { upload, setUploadFolder } from "../middleware/Multer.js";

const router = express.Router();

// Create
router.post(
  "/create",
  isAuthenticated,
  isAdmin("admin"),
  setUploadFolder("popularChoiceImages"),
  upload.single("photo"),
  createPopularChoice
);

// Get All
router.get("/all", getAllPopularChoices);

// Get by current admin
router.get("/my", isAuthenticated, isAdmin("admin"), getMyPopularChoices);

// Update
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin("admin"),
  setUploadFolder("popularChoiceImages"),
  upload.single("photo"),
  updatePopularChoice
);

// Delete
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deletePopularChoice);
router.get('/:id', getPopularChoiceById);

export default router;
