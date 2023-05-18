const todo = require("../controllers/todo");
const todoRoutes = require("express").Router();

todoRoutes.get("/health/todo", todo.health);
todoRoutes.post("/todo/create", todo.create);
todoRoutes.put("/update/todo/:id", todo.update);
todoRoutes.delete("/delete/todo/:id", todo.delete);
todoRoutes.get("/getbyid/todo/:id", todo.getbyid);
todoRoutes.get("/getall/todo", todo.getall);

module.exports = todoRoutes;
