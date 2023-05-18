const asyncHandler = require("express-async-handler");
const { successResponse } = require("../utilities/handleResponse");
const UserModel = require("../models/userModel");
const toDoModel = require("../models/toDo");

const admin = {};

admin.health = asyncHandler(async (req, res) => {
  res.send("Hello World!");
});

admin.register = asyncHandler(async (req, res) => {
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

    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    });

    if (!newUser) {
      res.status(500);
      throw new Error("could not create user");
    } else {
      successResponse(res, 201, "Account created successfully.", newUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.update = asyncHandler(async (req, res) => {
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
    if (!updatedUser) {
      res.status(500);
      throw new Error("could not update user");
    } else {
      successResponse(res, 200, "User updated successfully.", updatedUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.delete = asyncHandler(async (req, res) => {
  const check = await UserModel.findById(req.params.id);
  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      res.status(500);
      throw new Error("could not delete user");
    } else {
      successResponse(res, 200, "User deleted successfully.", "User deleted");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.getbyid = asyncHandler(async (req, res) => {
  const check = await UserModel.findById(req.params.id);

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    } else {
      successResponse(res, 200, "User found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.getall = asyncHandler(async (req, res) => {
  const check = await UserModel.find();

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    } else {
      successResponse(res, 200, "Users found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// for todo

admin.todoupdate = asyncHandler(async (req, res) => {
  const check = await toDoModel.findById(req.params.id);
  const { username, email, title, text, status } = req.body;
  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    const updatedTodo = await toDoModel.findByIdAndUpdate(
      req.params.id,
      {
        username: username.trim(),
        email: email.trim(),
        title: title.trim(),
        text: text.trim(),
        status: status,
      },
      {
        new: true,
      }
    );
    if (!updatedTodo) {
      res.status(500);
      throw new Error("could not update todo");
    } else {
      successResponse(res, 201, "todo updated successfully.", updatedTodo);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.tododelete = asyncHandler(async (req, res) => {
  const check = await toDoModel.findById(req.params.id);
  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    const deleteTodo = await toDoModel.findByIdAndDelete(req.params.id);
    if (!deleteTodo) {
      res.status(500);
      throw new Error("could not delete todo");
    } else {
      successResponse(res, 200, "todo deleted successfully.", "User deleted");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.todogetbyid = asyncHandler(async (req, res) => {
  const check = await toDoModel.findById(req.params.id);

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    } else {
      successResponse(res, 200, "todo found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

admin.todogetall = asyncHandler(async (req, res) => {
  const check = await toDoModel.find();

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    } else {
      successResponse(res, 200, "todo found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = admin;
