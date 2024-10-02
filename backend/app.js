const express = require("express");
const cookieParser = require("cookie-parser");

const registerRoutes = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", registerRoutes);
app.use("/auth", authRouter);

const errorHandler = (err, req, res, next) => {
  // Handle different types of errors
  if (err.name === "SequelizeValidationError") {
    return res
      .status(400)
      .json({ msg: err.errors.map((error) => error.message) });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ msg: "User with this email already exists" });
  }

  // Handle 404 errors
  if (err.status === 404) {
    return res.status(404).json({ msg: "Not Found" });
  }

  // Generic server error
  return res
    .status(500)
    .json({ msg: "Internal Server Error", error: err.message });
};

app.use(errorHandler);

module.exports = app;
