const InteractionModel = require("../models/interaction");
const UserModel = require("../models/user");

const addNewTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  const interaction = await InteractionModel.create({
    title: req.body.title,
    card: "TODO",
    createdBy: req.user._id,
  });

  if (interaction) {
    res.status(201).json(interaction);
  } else {
    res.status(401).json({ message: "Failed to create Task" });
  }
};

const getAllTodoTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  let allTodo = await InteractionModel.find({
    card: "TODO",
    createdBy: req.user._id,
  });

  if (allTodo.length > 0) {
    res.status(200).json(allTodo);
  } else {
    res.status(404).json({ message: "No TODO tasks found" });
  }
};

const getAllInProgressTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  let allTodo = await InteractionModel.find({
    card: "IN PROGRESS",
    createdBy: req.user._id,
  });

  if (allTodo.length > 0) {
    res.status(200).json(allTodo);
  } else {
    res.status(404).json({ message: "No In Progress tasks found" });
  }
};

const getAllDoneTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  let allTodo = await InteractionModel.find({
    card: "DONE",
    createdBy: req.user._id,
  });

  if (allTodo.length > 0) {
    res.status(200).json(allTodo);
  } else {
    res.status(404).json({ message: "No Done tasks found" });
  }
};

const deleteTask = async (req, res) => {
  console.log(req.body);

  await InteractionModel.deleteOne({
    card: req.body.card,
    title: req.body.title,
  });

  res.status(201).json({message: "Deleted Successfully"});
};

module.exports = {
  addNewTask,
  getAllTodoTask,
  getAllInProgressTask,
  getAllDoneTask,
  deleteTask,
};
