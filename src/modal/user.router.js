const express = require("express");
const UserModel = require("../Schema/user.schema");

const app = express.Router();

app.post("/signup", async (req, res) => {
  console.log(req.body);
  let { name, email, password } = req.body;
  let user = await UserModel.findOne({ email });
  try {
    if (user) {
      return res
        .status(400)
        .send("This email has already an account please use another email");
    }
    let newUser = new UserModel({ name, email, password });
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send("These fields are required");
  }

  try {
    const user = await UserModel.findOne({ email, password });
    if (user) {
      return res
        .status(200)
        .send({ data: user, msg: "User login successfully" });
    } else {
      return res.status(401).send("Email or Password is not not match");
    }
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

module.exports = app;
