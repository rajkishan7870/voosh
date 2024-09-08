const InteractionModel = require("../models/interaction");
const UserModel = require("../models/user");

const addNewTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  const interaction = await InteractionModel.create({
    title: req.body.title,
    description: "",
    card: "TODO",
    createdBy: req.user._id,
  });

  if (interaction) {
    res.status(201).json(interaction);
  } else {
    res.status(201).json({ message: "Failed to create Task" });
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
    res.status(201).json({ message: "No TODO tasks found" });
  }
};

const getAllInProgressTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  let allInProgress = await InteractionModel.find({
    card: "IN PROGRESS",
    createdBy: req.user._id,
  });

  if (allInProgress.length > 0) {
    res.status(200).json(allInProgress);
  } else {
    res.status(201).json({ message: "No In Progress tasks found" });
  }
};

const getAllDoneTask = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  let allDone = await InteractionModel.find({
    card: "DONE",
    createdBy: req.user._id,
  });

  if (allDone.length > 0) {
    res.status(200).json(allDone);
  } else {
    res.status(201).json({ message: "No Done tasks found" });
  }
};

const deleteTask = async (req, res) => {
  console.log(req.body);

  await InteractionModel.deleteOne({
    card: req.body.card,
    title: req.body.title,
  });

  res.status(201).json({ message: "Deleted Successfully" });
};

const editDetails = async (req, res) => {
  console.log(req.body);

  if (req.body?.title || req.body?.description) {
    await InteractionModel.updateOne({ _id: req.body._id },
      {                  
        $set: {
          title: req.body?.title,
          description: req.body?.description,
          updatedAt: Date.now()
        }
      })
    
  }

  res.status(201).json({ message: "Updated Successfully" });
};


const dragTask = async (req, res)=>{
  console.log(req.body)
  if (req.body._id){
  await InteractionModel.updateOne({ _id: req.body._id },
    {                  
      $set: {
        card: req.body.card
      }
    })
    res.status(201).json({ message: "Dropped Successfully" });
  }
  else{
    res.status(201).json({message: "Not Dropped"})
  }
}

module.exports = {
  addNewTask,
  getAllTodoTask,
  getAllInProgressTask,
  getAllDoneTask,
  deleteTask,
  editDetails,
  dragTask,
};
