import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";

const checkAuth = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json(
        apiResponse(false, "Not Authorized! Please Login again.")
      );
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode) {
      return res.json(
        apiResponse(false, "Not Authorized! Please Login again.")
      );
    }
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json(
      apiResponse(false, error.message || "Error occured during user creation")
    );
  }
};

export default checkAuth;
