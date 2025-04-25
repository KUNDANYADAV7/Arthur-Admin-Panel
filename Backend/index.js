import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression"; // ✅ Added compression

// Routes
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import offerRoutes from "./routes/Offer.route.js";
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

app.use(compression()); // ✅ Enables gzip compression for faster API & frontend responses
app.use(express.json());
app.use(cookieParser());

// ✅ Serve static files (like images) from /public folder with 1 year cache
app.use(express.static('public', {
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.webp') || path.endsWith('.gif') || path.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
