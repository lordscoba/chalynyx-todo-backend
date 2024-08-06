const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Chalynyx Todo website",
    description: "Description",
  },
  host: "https://chalynyx-todo-backend.onrender.com",
};

const outputFile = "./swagger_output.json";
const routes = ["./server.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
