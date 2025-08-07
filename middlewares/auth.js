import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";

const checkAuth = async (req, res, next) => {
  try {
    console.log("req.headers", req.headers);
    const { token } = req.headers;
    if (!token) {
      return res.json(
        apiResponse(false, "Not Authorized! Please Login again.")
      );
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token_decode", token_decode);
    if (!token_decode.id) {
      return res.json(
        apiResponse(false, "Not Authorized! Please Login again.")
      );
    }
    next();
  } catch (error) {
    console.log(error);
    res.json(
      apiResponse(false, error.message || "Error occured during user creation")
    );
  }
};

export default checkAuth;
