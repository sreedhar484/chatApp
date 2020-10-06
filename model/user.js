const mongoose = require("mongoose");

const User = mongoose.Schema({
  userName: String,
  password: String,
  users:Array,
  type:String,
  date: {
    type: Date,
    default: Date.now,
  },
  userImage:String,
});

module.exports = mongoose.model("Users", User);
