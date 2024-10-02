const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const registerRoutes = require("./routes/register.route");
const User = require("./models/User");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure methods include OPTIONS
  })
);

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced.");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

app.use("/user", registerRoutes);
app.use("/auth", authRouter);

app.get("/user/all-users", async (req, res, next) => {
  // Add next parameter
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass error to error handler
  }
});

app.delete("/user/delete-user/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404; // Set status for 404
      return next(error); // Pass error to error handler
    }

    await user.destroy();
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    next(error); // Pass error to error handler
  }
});

app.delete("/user/delete-all-users", async (req, res, next) => {
  try {
    await User.destroy({ where: {} });
    res.status(200).json({ msg: "All users deleted" });
  } catch (error) {
    next(error); // Pass error to error handler
  }
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
