const express = require('express');
const { addNewTask, getAllTodoTask, getAllInProgressTask, getAllDoneTask, deleteTask } = require('../controllers/interaction');


const router = express.Router();

router.post("/add", addNewTask)
router.get("/alltodo", getAllTodoTask)
router.get("/allInProgress", getAllInProgressTask)
router.get("/allDone", getAllDoneTask)
router.delete("/del", deleteTask)

module.exports = router;