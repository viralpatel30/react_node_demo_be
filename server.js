import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import "./utils/index.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";

const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api", authRouter);
app.use("/api", productRouter);

app.get("/", (req, res) => {
  res.send("API working!!!");
});
