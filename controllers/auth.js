const asyncHandler = require("express-async-handler");
const { successResponse } = require("../utilities/handleResponse");
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");

const user = {};

user.health = asyncHandler(async (req, res) => {
  res.send("Hello World!");
});

user.register = asyncHandler(async (req, res) => {
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
      res.status(400);
      throw new Error("Username is taken");
    }

    const id = new mongoose.Types.ObjectId();

    const newUser = await UserModel.create({
      _id: id,
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    });

    if (newUser) {
      successResponse(res, 201, "Account created successfully.", newUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = user;
