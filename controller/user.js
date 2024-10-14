const usermodel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const user = await usermodel.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).send({ message: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 5);
        req.body.password = hashedPassword;
        const newUser = new usermodel(req.body);
        newUser.save().then((addedUser) => {
          res.send({
            status: "User register successfully",
            data: addedUser,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const user = await usermodel.findOne({ username: req.body.username });
      if (user) {
        const token = jwt.sign(
          { username: user.username, userID: user.id },
          "you cant steel my password",
          { expiresIn: "1h" }
        );

        const isPasswordMatched = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPasswordMatched) {
          res.json({
            data: { username: user.username, userID: user.id },
            token,
          });
        } else {
          res.send({ error: "Conflict", description: "Incorrect Password" });
        }
      } else {
        res.send({
          error: "Conflict",
          description: "User doesnot exist with this email",
        });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};

module.exports = userCtrl;
