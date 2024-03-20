const { user } = require("../modals/user.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginUser } = require("../services/user.services");

const userlogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await loginUser(email, password);
    if (user) {
      if (user.message) {
        res.status(401).json({ message: user.message });
      } else if (!user.message) {
        let token = jwt.sign(user, "secretKey");
        res.send({
          authToken: token,
          user: { email: email, id: user.userId, name: user.username },
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = salt && (await bcrypt.hash(password, salt));
    if (!hashPassword) {
      res.status(500).send({ message: "Something went wrong" });
    }
    user.push({
      userId: user.length + 1,
      username,
      email: email,
      password: hashPassword,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports = {
  createNewUser: createNewUser,
  userlogin: userlogin,
};
