const admin = require("../controllers/admin");
const adminRoutes = require("express").Router();

adminRoutes.get("/health/admin", admin.health);

// for users
adminRoutes.post("/admin/create/user", admin.register);
adminRoutes.put("/admin/update/user/:id", admin.update);
adminRoutes.delete("/admin/delete/user/:id", admin.delete);
adminRoutes.get("/admin/getbyid/user/:id", admin.getbyid);
adminRoutes.get("/admin/getall/user", admin.getall);

// // for todo
adminRoutes.put("/admin/update/todo/:id", admin.todoupdate);
adminRoutes.delete("/admin/delete/todo/:id", admin.tododelete);
adminRoutes.get("/admin/getbyid/todo/:id", admin.todogetbyid);
adminRoutes.get("/admin/getall/todo", admin.todogetall);

module.exports = adminRoutes;
