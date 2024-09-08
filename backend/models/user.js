const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: { type: "string", required: true },
    lName: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);

module.exports =  UserModel