let { task } = require("../modals/task.modal");

const getTaskByUserId = (req, res) => {
  const { id } = req.params;
  try {
    const data = task.filter((tasks) => tasks.createdBy === id);
    if (data) {
      res.status(200).send({ tasks: data });
    } else {
      res.status(200).send({ tasks: [] });
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
const deleteTaskByTaskId = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    task = task.filter((tasks) => tasks.taskId !== id);
    let newTask = task.filter((tasks) => tasks.createdBy === userId);
    res.status(200).send({ tasks: newTask });
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
};

const createNewTask = (req, res) => {
  const { taskId, title, description, createdBy } = req.body;
  try {
    task.push({ taskId, title, description, createdBy });
    let tasks = task.filter((newTask) => newTask.createdBy === createdBy);
    res.status(200).send({ tasks });
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

const editTask = (req, res) => {
  const { createdBy, id, title, description } = req.body;
  try {
    task.forEach((tasks, index) => {
      if (tasks.taskId === id) {
        task[index] = { ...tasks, title, description };
      }
    });
    let newTasks = task.filter((newTask) => newTask.createdBy === createdBy);
    res.status(200).send({ tasks: newTasks });
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

module.exports = {
  getTaskByUserId,
  deleteTaskByTaskId,
  createNewTask,
  editTask,
};
