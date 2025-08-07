import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import checkAuth from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.post("/create-product", checkAuth, createProduct);
productRouter.get("/get-product", checkAuth, getProducts);

export default productRouter;
