const mongoose = require("mongoose");
const moment = require("moment")
const Chat = mongoose.Schema({
  message: String,
  type:String,
  sender: String,
  reciever: String,
});

module.exports = mongoose.model("Chats", Chat);
