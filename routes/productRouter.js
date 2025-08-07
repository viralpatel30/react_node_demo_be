import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import checkAuth from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.post("/products", checkAuth, createProduct);
productRouter.get("/products", checkAuth, getProducts);

export default productRouter;
