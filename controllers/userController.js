import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const register = async (req, res, next) => {
  console.log(req.body);
  const { userName, email, password } = req.body;
  console.log("hallo");
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = createError(409, "user already exists!");
      next(error);
    }
    const user = new User({
      userName,
      email,
      password,
    });
    await user.save();
    ///
    // const user = await await User.findOne({ email });
    // if (!user) {
    //   const error = createError(404, "email not found!");
    //   return next(error);
    // }
    // const matched = await user.comparePassword(password, user.password);
    // if (!matched) {
    //   const error = createError(500, { msg: "password incorrect!" });
    //   return next(error);
    // }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
    console.log("🚀 ~ file: userController.js:72 ~ login ~ token:", token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    const userWithoutPassword = user.toJSON();
    console.log(userWithoutPassword);
    ///
    return res
      .status(201)
      .json({ msg: "User created Successfully!", userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await await User.findOne({ email });
    if (!user) {
      const error = createError(404, "email not found!");
      return next(error);
    }
    const matched = await user.comparePassword(password, user.password);
    if (!matched) {
      const error = createError(500, { msg: "password incorrect!" });
      return next(error);
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, "000000", { expiresIn: "1h" });
    console.log("🚀 ~ file: userController.js:72 ~ login ~ token:", token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    const userWithoutPassword = user.toJSON();
    console.log(userWithoutPassword);

    res
      .status(200)
      .json({ token, msg: "You are logged in 🙂 ", userWithoutPassword });
  } catch (error) {
    console.log("2");
    console.log("🚀 ~ file: userController.js:78 ~ login ~ error:", error);
    next(createError(500, { msg: "Server Error!" }));
  }
};

export const clearCookie = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "user logged out" });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const checkCookie = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.userId).select("-__v");
    console.log(user);
    res.json(user);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
