const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const {
  createRefreshToken,
  verifyJsonWebToken
} = require("../helper/jsonWebToken");

const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.verified) {
      return res.status(400).json({ msg: "Please verify your account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    createRefreshToken(res, { id: user.id, email: user.email });

    res.status(200).json({ msg: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authRouter.get("/verify-user", async (req, res, next) => {
  try {
    const affiliate = req.cookies?.affiliate;

    if (!affiliate) {
      return res.status(401).send({ msg: "Token Not found. Please login." });
    }

    const existUser = verifyJsonWebToken(affiliate, refreshTokenKey);

    if (!existUser) {
      return res.status(401).send({ msg: "Token verification failed!" });
    }

    const userInDB = await User.findOne({ where: { email: existUser.email } });

    if (!userInDB) {
      return res.status(404).send({ msg: "User not found." });
    }

    // Directly use the userInDB without toObject()
    const user = userInDB.get();
    delete user.password;

    res.status(200).send({ msg: "User found successfully.", user });
  } catch (error) {
    return next(error);
  }
});

module.exports = authRouter;
