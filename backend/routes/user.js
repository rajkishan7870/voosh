const express = require('express');
const { createNewUser, verifyUser } = require("../controllers/user")

const router = express.Router();
  
router.post("/signup", createNewUser);
router.post("/login", verifyUser)

module.exports = router;