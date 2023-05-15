const user = require("../controllers/auth");
const express = require("express");
const app = express();
const userRoutes = require("express").Router();

// routes.get("/health", user.health);
userRoutes.get("/health/user", (req, res) => {
  res.send("user is working");
});

module.exports = userRoutes;
