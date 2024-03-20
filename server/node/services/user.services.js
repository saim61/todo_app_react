const { user } = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (email, password) => {
  const data = user.find((u) => u.email === email);
  if (data) {
    const pass = await bcrypt.compare(password, data.password);
    if (pass) {
      return data;
    } else {
      return { message: "Password is incorrect" };
    }
  }
};

const verifyUser = (token) => {
  const user = jwt.verify(token, "secretKey", (err, data) => {
    if (err) {
      return { message: err.message };
    } else {
      return data;
    }
  });
  if (user.message) {
    return { err: user.message };
  } else {
    return user;
  }
};
module.exports = { loginUser, verifyUser };
