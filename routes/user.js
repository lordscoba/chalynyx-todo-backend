const user = require("../controllers/auth");
const express = require("express");
const app = express();
const userRoutes = require("express").Router();

userRoutes.get("/health/user", user.health);
userRoutes.post("/register/user", user.register);
// userRoutes.post("/login/user", user.login);

module.exports = userRoutes;
