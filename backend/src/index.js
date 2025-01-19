import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const port = process.env.PORT || 3002;

const app = express();

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}...`);
  connectDB();
});
