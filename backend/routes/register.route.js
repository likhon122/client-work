const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendVerificationEmail = require("../helper/sendVerificationEmail");
const router = express.Router();
const {
  registerValidation,
  verifyValidation,
  resendCodeValidation
} = require("../validation/authValidation");
const { runValidation } = require("../validation/validation");
const {
  createAccessToken,
  createRefreshToken
} = require("../helper/jsonWebToken");

router.post(
  "/register",
  registerValidation,
  runValidation,
  async (req, res) => {
    const { email, password, username } = req.body;

    console.log(email, username, password);

    try {
      // Check if user already exists
      let user = await User.findOne({ where: { email } });

      if (user?.verified) {
        res.status(400).json({ msg: "User already exists" });
      }

      if (user && !user.verified) {
        await user.destroy();
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a verification code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const emailData = {
        email,
        subject: "Account activation email",
        html: `
       <h2>Hi ${username} !</h2>
    <p>
      You trying to create an account on our app. You only create this
      account to verify your account. So you verify your account! Please enter this code in verification code field.
    </p>
    <div style="padding: 10px 0px">
      <h3 style="color: #333; font-size: 24px; text-align: center">
        ${verificationCode}
      </h3>
      >
    </div>
      `
      };

      // Send verification email
      await sendVerificationEmail(emailData);

      // Create a new user
      user = await User.create({
        email,
        password: hashedPassword,
        username,
        verificationCode
      });

      res
        .status(200)
        .json({ msg: "User registered. Verification email sent." });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

router.post("/verify", verifyValidation, runValidation, async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.verificationCode !== code) {
      return res.status(400).json({ msg: "Invalid verification code" });
    }

    // Update user to be verified
    user.verified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ msg: "User verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post(
  "/resend-code",
  resendCodeValidation,
  runValidation,
  async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ msg: "User not found" });

      if (user.verified)
        return res
          .status(400)
          .json({ msg: "This account is already verified." });

      // Rate limit check (optional, e.g., 1-minute)
      const now = new Date();
      const lastResendTime = user.lastResendTime || new Date(0);
      const timeDifference = (now - lastResendTime) / 1000 / 60; // Minutes

      if (timeDifference < 1) {
        return res
          .status(429)
          .json({ msg: "Please wait before requesting a new code." });
      }

      // Generate a new verification code
      const newVerificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Update the user with the new code and resend time
      user.verificationCode = newVerificationCode;
      user.lastResendTime = now;
      await user.save();

      // Send the new verification code
      await sendVerificationEmail(email, newVerificationCode);

      res
        .status(200)
        .json({ msg: "A new verification code has been sent to your email." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error. Please try again later." });
    }
  }
);

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user && !user.verified) {
      return res.status(400).json({ msg: "You are not authenticated!!" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = resetCode;
    await user.save();

    const emailData = {
      email,
      subject: "Forgot password email",
      html: `
      <h2>Hi ${user.username} !</h2>
      <p>
        You requested a password reset. Please enter the following code in the reset password form.
      </p>
      <div style="padding: 10px 0px">
        <h3 style="color: #333; font-size: 24px; text-align: center">
          ${resetCode}
        </h3>
      </div>
      `
    };

    // Send the reset code
    await sendVerificationEmail(emailData);

    res.status(200).json({ msg: "Reset code sent to your email" });
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ msg: "Invalid reset code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
