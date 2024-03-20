const express = require("express");
const { createNewUser, userlogin } = require("../controllers/user.controller");
const {
  userExists,
  validateUserRequestBody,
  validateLoginRequestBody,
  userDoesNotExists,
} = require("../middlewares/user.middleware");
const userRouter = express.Router();

userRouter.post(
  "/login",
  validateLoginRequestBody,
  userDoesNotExists,
  userlogin
);
userRouter.post(
  "/add-user",
  validateUserRequestBody,
  userExists,
  createNewUser
);
module.exports = userRouter;
