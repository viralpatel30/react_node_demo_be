import express from "express";
import { registerUser, login } from "../controllers/authController.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerUser);
adminRouter.post("/login", login);

export default adminRouter;
