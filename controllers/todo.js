const asyncHandler = require("express-async-handler");
const { successResponse } = require("../utilities/handleResponse");
const toDoModel = require("../models/toDo");
const mongoose = require("mongoose");

const todo = {};

todo.health = asyncHandler(async (req, res) => {
  res.send("Hello World!");
});

todo.create = asyncHandler(async (req, res) => {
  const { username, email, title, text } = req.body;
  try {
    const titleTaken = await toDoModel.findOne({
      title: title.trim(),
    });

    if (titleTaken) {
      res.status(400);
      throw new Error("Title is taken");
    }

    const status = false;
    const id = new mongoose.Types.ObjectId();
    const newTodo = await toDoModel.create({
      _id: id,
      username: username.trim(),
      email: email.trim(),
      title: title.trim(),
      text: text.trim(),
      status: status,
    });

    if (newTodo) {
      successResponse(res, 201, "Task created successfully.", newTodo);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

todo.update = asyncHandler(async (req, res) => {
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
    if (updatedTodo) {
      successResponse(res, 201, "todo updated successfully.", updatedTodo);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

todo.delete = asyncHandler(async (req, res) => {
  const check = await toDoModel.findById(req.params.id);
  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    const deleteTodo = await toDoModel.findByIdAndDelete(req.params.id);
    if (deleteTodo) {
      successResponse(res, 200, "todo deleted successfully.", "User deleted");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

todo.getbyid = asyncHandler(async (req, res) => {
  const check = await toDoModel.findById(req.params.id);

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    if (check) {
      successResponse(res, 200, "todo found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

todo.getall = asyncHandler(async (req, res) => {
  const check = await toDoModel.find();

  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    if (check) {
      successResponse(res, 200, "todo found successfully.", check);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = todo;
