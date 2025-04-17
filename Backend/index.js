

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import offerRoutes  from "./routes/Offer.route.js";
import certificateRoutes  from "./routes/certificate.route.js";
import menuRoutes from "./routes/menu.route.js";
import categoryRoutes from "./routes/menucategory.route.js"
import popularchoiceRoutes from "./routes/popularchoice.route.js"





dotenv.config();  // ✅ Load .env first

const app = express();
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONOG_URI;

// Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URI,
//     // origin: (origin, callback) => {
//     //   callback(null, true); // Accept any origin
//     // },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

const allowedOrigins = process.env.FRONTEND_URIS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

// Database Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB "+process.env.PORT))
  .catch((error) => console.log("MongoDB connection error:", error));

// Define routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/menus", menuRoutes);
app.use("/api/offers",offerRoutes)
app.use("/api/menucategory",categoryRoutes)
app.use("/api/popularchoice",popularchoiceRoutes)
// app.use("/api/certificates",certificateRoutes)


// Start server
app.listen(port, () => {
  console.log(`Server is running`);
});



