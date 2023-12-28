import express, { Application } from "express";
import cors from "cors";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app: Application = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
