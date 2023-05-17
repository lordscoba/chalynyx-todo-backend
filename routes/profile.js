const profile = require("../controllers/profile");
const express = require("express");
const app = express();
const profileRoutes = require("express").Router();

profileRoutes.put("/update/user/:id", profile.update);
profileRoutes.get("/getbyid/user/:id", profile.getbyid);

module.exports = profileRoutes;
