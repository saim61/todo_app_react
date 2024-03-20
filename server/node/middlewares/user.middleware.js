const { createUser, loginBody } = require("../validators/user.validator");
const { verifyUser } = require("../services/user.services");
const { user } = require("../modals/user.modal");
const userExists = (req, res, next) => {
  const { email } = req.body;
  const duplicateEmail = user.find((u) => u.email === email);
  if (duplicateEmail) {
    return res
      .status(409)
      .send({ message: "Account with this email already exists" });
  }
  next();
};
const validateUserRequestBody = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await createUser.validateAsync({
      username,
      email,
      password,
    });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
const userDoesNotExists = (req, res, next) => {
  const { email } = req.body;
  const duplicateEmail = user.find((u) => u.email === email);
  if (duplicateEmail) {
    next();
  } else {
    return res.status(409).send({
      message: "Account with this email does'nt exists",
    });
  }
};
const validateLoginRequestBody = async (req, res, next) => {
  try {
    await loginBody.validateAsync({
      email: req.body.email,
      password: req.body.password,
    });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
const isAuthenticated = (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    let user = verifyUser(token);

    if (user) {
      if (user.err) {
        res.send({ message: user.err });
      } else {
        req.body.user = user;
        next();
      }
    }
  } else {
    res.send("Not Authenticated");
  }
};
module.exports = {
  userExists,
  validateUserRequestBody,
  validateLoginRequestBody,
  userDoesNotExists,
  isAuthenticated,
};
