import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import offerRoutes from "./routes/Offer.route.js";
import certificateRoutes from "./routes/certificate.route.js";
import menuRoutes from "./routes/menu.route.js";
import categoryRoutes from "./routes/menucategory.route.js";
import popularchoiceRoutes from "./routes/popularchoice.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONOG_URI;

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = process.env.FRONTEND_URIS.split(",");
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

// DB connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// API Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/menus", menuRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/menucategory", categoryRoutes);
app.use("/api/popularchoice", popularchoiceRoutes);

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========= USER WEBSITE (Arthur_Frontend on "/") =========
const userFrontendPath = path.join(__dirname, "../Arthur_Frontend/dist");
app.use(express.static(userFrontendPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(userFrontendPath, "index.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(userFrontendPath, "index.html"));
});

// ========= ADMIN PANEL (Sandwich on "/admin") =========
const adminFrontendPath = path.join(__dirname, "../Sandwich/dist");
app.use("/", express.static(adminFrontendPath));
app.get("/*", (req, res) => {
  res.sendFile(path.join(adminFrontendPath, "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
