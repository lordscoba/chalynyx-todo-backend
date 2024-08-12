const swaggerAutogen = require("swagger-autogen");
const host = require("../config/swagger.config.js");

console.log(host);

const doc = {
  info: {
    title: "Chalynyx Todo website",
    description: "Description",
  },
  host: host,
};

const outputFile = "./swagger_output.json";
const routes = ["./server.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
