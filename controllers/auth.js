const asyncHandler = require("express-async-handler");
const { successResponse } = require("../utilities/handleResponse");
const UserModel = require("../models/userModel");
const tokenHandler = require("../utilities/handleToken");

const user = {};

user.health = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Health']
  res.send("Hello World!");
});

user.register = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Authentication']
  const { name, username, email, password } = req.body;
  try {
    const emailTaken = await UserModel.findOne({ email });
    if (emailTaken) {
      res.status(400);
      throw new Error("Email is taken");
    }

    const usernameTaken = await UserModel.findOne({
      username: username.trim(),
    });

    if (usernameTaken) {
      res.status(404);
      throw new Error("Username is taken");
    }

    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    });

    if (!newUser) {
      res.status(500);
      throw new Error("could not register user");
    } else {
      successResponse(res, 201, "Account created successfully.", newUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

user.login = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Authentication']
  const { username, password } = req.body;

  try {
    const exists = await UserModel.findOne({
      username: username.trim(),
      password: password.trim(),
    });

    if (!exists) {
      res.status(400);
      throw new Error("Invalid username or password");
    }

    successResponse(res, "200", "Login success", {
      username: exists.username,
      type: exists.type,
      token: tokenHandler.generateToken({
        id: exists._id.toString(),
        email: exists.email,
        type: exists.type,
        username: exists.username,
      }),
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = user;
