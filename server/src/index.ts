import express, { Application } from "express";
import cors from "cors";
import apiRouter from "./routes";
import "dotenv/config";
import mysql from "mysql2";

const connection = mysql.createConnection(process.env.DATABASE_URL!);

console.log("Connected to database");

const app: Application = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
