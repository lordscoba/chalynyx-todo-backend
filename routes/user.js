const user = require("../controllers/auth");
const userRoutes = require("express").Router();

userRoutes.get("/health/user", user.health);
userRoutes.post("/register/user", user.register);
userRoutes.post("/login/user", user.login);

module.exports = userRoutes;
