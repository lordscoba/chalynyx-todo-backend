// importing express framework
const express = require("express");
const app = express();

// importing .env parser
const dotenv = require("dotenv");
dotenv.config();

// importing monogodb database
const connectDB = require("./config/db");
connectDB();

// importing swagger ui
const { readFileSync } = require("fs");
const swaggerUi = require("swagger-ui-express");

// Read the JSON file synchronously
const rawData = readFileSync("./swagger/swagger_output.json", "utf-8");
const swaggerFile = JSON.parse(rawData);

// importing middlewares
const cors = require("cors");
const bodyParser = require("body-parser");
const { protectUser } = require("./middleware/userMiddleware"); // Auth Middlewares

// Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const todoRoutes = require("./routes/todo");
const profileRoutes = require("./routes/profile");

//swagger inititailization
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Running routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/", userRoutes);

// protected routes
app.use(protectUser);
app.use("/api/", adminRoutes);
app.use("/api/", profileRoutes);
app.use("/api/", todoRoutes);

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
