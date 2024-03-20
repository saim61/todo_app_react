const express = require("express");
const { isAuthenticated } = require("../middlewares/user.middleware");
const {
  getTaskByUserId,
  deleteTaskByTaskId,
  createNewTask,
  editTask,
} = require("../controllers/task.controller");
const taskRouter = express.Router();

taskRouter.get("/get-by-id/:id", isAuthenticated, getTaskByUserId);
taskRouter.post("/edit-task", isAuthenticated, editTask);
taskRouter.post("/add-task", isAuthenticated, createNewTask);
taskRouter.post("/delete-by-task-id/:id", deleteTaskByTaskId);
module.exports = taskRouter;
