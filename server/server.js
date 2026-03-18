import "./config/instrument.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

console.log("👉 MONGO_URI =", process.env.MONGO_URI);

import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"
// import {clerkMiddleware} from "@clerk/express"

// Initialize the app
const app = express();

// Connecting to DB
await connectDB();

// connect to clodinary

 await connectCloudinary();
 
// Middlewares
app.use(cors());
app.use(express.json());
// app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My First Sentry Error");
});

app.post("/webhooks", clerkWebhooks);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Port Set up
const PORT = process.env.PORT || 3000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);
console.log("JWT SECRET:", process.env.JWT_SECRET);

// Handle unhandled promise rejections and exceptions
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
