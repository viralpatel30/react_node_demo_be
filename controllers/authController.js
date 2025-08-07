import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../utils/index.js";
import apiResponse from "../utils/apiResponse.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json(apiResponse(false, "Email and password are required."));
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json(apiResponse(false, "User doest not exist with this email."));
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(apiResponse(false, "Invalid credentials."));
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json(
      apiResponse(true, "Login successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    );
  } catch (err) {
    console.error("Login Error:", err);
    res
      .status(500)
      .json(apiResponse(false, "An error occurred while logging in."));
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json(apiResponse(false, "Missing Details"));
    }

    // Validating a email format
    if (!validator.isEmail(email)) {
      return res.json(apiResponse(false, "Enter a valid email"));
    }

    // Validating a strong password
    if (password.length < 8) {
      return res.json(apiResponse(false, "Enter a strong password"));
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role: "user",
    };

    console.log("userData", userData);
    const newUser = await User.create(userData);
    await newUser.save();

    res.json(apiResponse(true, "User registered successfully"));
  } catch (err) {
    console.log("err:", err);
    res.json(
      apiResponse(false, err.message || "Error occured while registering user")
    );
  }
};

export { login, registerUser };
