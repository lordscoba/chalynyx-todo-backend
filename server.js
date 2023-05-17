// importing express framework
const express = require("express");
const app = express();

// importing .env parser
const dotenv = require("dotenv");
dotenv.config();

// importing monogodb database
const connectDB = require("./config/db");
connectDB();

// importing middlewares
const cors = require("cors");
const bodyParser = require("body-parser");
const { protectUser } = require("./middleware/userMiddleware"); // Auth Middlewares

// Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const todoRoutes = require("./routes/todo");
const profileRoutes = require("./routes/profile");

// Running routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/", userRoutes);

// protected routes
app.use(protectUser);
app.use("/api/", adminRoutes);
app.use("/api/", todoRoutes);
app.use("/api/", profileRoutes);

// Error Middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//Not found URL middleware
app.use(notFound);

//Error handler for the whole app
app.use(errorHandler);

//initializing server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
