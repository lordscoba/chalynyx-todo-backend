const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { decodeToken } = require("../utilities/handleToken");

/**
 * @description This middleware checks the user admin token supplied as Bearer authorization
 * @required Bearer Authorization
 */
const AuthMiddleware = {};

AuthMiddleware.protectUser = asyncHandler(async (req, res, next) => {
  let receivedToken = req.headers.authorization;
  let token;
  const eMessage = "You are not authorized to use this service, token failed";

  if (receivedToken && receivedToken.startsWith("Bearer")) {
    try {
      token = receivedToken.split(" ")[1];

      const decoded = decodeToken(token);

      const user = await userModel
        .findOne({
          username: decoded.fieldToSecure.username,
        })
        .select("-password");

      if (!user) {
        res.status(401);
        throw new Error("You are not authorized to use this service yet. ");
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(
      "You are not authorized to use this service, no token provided."
    );
  }
});

module.exports = AuthMiddleware;
