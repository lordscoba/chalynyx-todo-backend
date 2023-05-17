const asyncHandler = require("express-async-handler");
const { successResponse } = require("../utilities/handleResponse");
const UserModel = require("../models/userModel");

const profile = {};

profile.update = asyncHandler(async (req, res) => {
  const check = await UserModel.findById(req.params.id);
  const { name, username, email, password } = req.body;
  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        username: username,
        email: email,
        password: password,
      },
      {
        new: true,
      }
    );
    if (updatedUser) {
      successResponse(res, 201, "profile updated successfully.", updatedUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

profile.getbyid = asyncHandler(async (req, res) => {
  const check = await UserModel.findById(req.params.id);

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    if (check) {
      successResponse(res, 200, "profile found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = profile;
