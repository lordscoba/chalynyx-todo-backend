const profile = require("../controllers/profile");
const profileRoutes = require("express").Router();

profileRoutes.put("/update/user/:id", profile.update);
profileRoutes.get("/getbyid/user/:id", profile.getbyid);

module.exports = profileRoutes;
