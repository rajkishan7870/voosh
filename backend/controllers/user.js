const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const { setUser } = require("../service/auth");


const createNewUser = async (req, res) => {
  console.log(req.body);
  const { fName, lName, email, password } = req.body;

  if (!fName || !lName || !email || !password) {
    res.status(400).json({message: "Please fill all the details"})
  }
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(201).json({message: "User already Exist"})
  }

  salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    fName,
    lName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
    });
  } else {
    res.status(401).json({message: "Failed to create User"});
  }
};

const verifyUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    console.log(user)
    if (user) {
      console.log(user)
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const token = setUser(user);
        res.cookie("token", token);
  
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        });
      }
    } else {
      res.status(201).json({ message: "Invalid Email or password" });
    }
  };
  

module.exports = { createNewUser, verifyUser };