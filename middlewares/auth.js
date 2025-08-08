import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json(
        apiResponse(false, "Not Authorized! Please Login again.")
      );
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode.id) {
      return res.json(
        apiResponse(false, "Not Authorized! Please Login again.")
      );
    }
    next();
  } catch (error) {
    res.json(
      apiResponse(false, error.message || "Error occured during user creation")
    );
  }
};

export default checkAuth;
