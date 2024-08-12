// config.js
const config = {
  development: "http://localhost:3000",
  production: "https://chalynyx-todo-backend.onrender.com",
};

const currentEnv =
  process.env.NODE_ENV === "development" ? "development" : "production";

module.exports = config[currentEnv];
