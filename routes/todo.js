const user = require("../controllers/todo");
const express = require("express");
const app = express();
const todoRoutes = require("express").Router();

todoRoutes.get("/health/todo", (req, res) => {
  res.send("todo is working");
});

module.exports = todoRoutes;
