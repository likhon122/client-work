const express = require("express");

const { runValidation } = require("../validation/validation");
const { userIsLoggedIn } = require("../middlewares/auth");
const { withdrawController } = require("../controllers/withdraw.controller");

const withdrawRouter = express.Router();

withdrawRouter.post("/", userIsLoggedIn, withdrawController);

module.exports = withdrawRouter;
