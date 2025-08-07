import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import "./utils/index.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
const port = process.env.PORT || 4000;

const app = express();
await connectDB();

//middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API working!!!");
});

app.listen(port, () => console.log(`🚀 Server running on port ${port} `));
