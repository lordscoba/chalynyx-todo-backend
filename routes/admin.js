const user = require("../controllers/admin");
const express = require("express");
const app = express();
const adminRoutes = require("express").Router();

// routes.get("/health", user.health);
adminRoutes.get("/health/admin", (req, res) => {
  res.send("admin is working");
});

module.exports = adminRoutes;
