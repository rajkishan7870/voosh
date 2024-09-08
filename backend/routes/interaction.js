const express = require('express');
const { addNewTask, getAllTodoTask, getAllInProgressTask, getAllDoneTask, deleteTask, editDetails } = require('../controllers/interaction');


const router = express.Router();

router.post("/add", addNewTask)
router.get("/alltodo", getAllTodoTask)
router.get("/allInProgress", getAllInProgressTask)
router.get("/allDone", getAllDoneTask)
router.delete("/del", deleteTask)
router.patch("/update", editDetails)

module.exports = router;