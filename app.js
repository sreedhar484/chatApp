const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const User = require("./model/user");
const Chat = require("./model/chat");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 1234;
const MONGO_URL =
  "mongodb+srv://sreedhar:sree1431@cluster0.qqiot.mongodb.net/User?retryWrites=true&w=majority";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); //Appending extension
  },
});
const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/uploads", express.static("uploads"));

app.post("/register", upload.single("userImage"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const user = new User({
    userName: req.body.userName,
    password: req.body.pwd1,
    users: req.body.users,
    type: req.body.type,
    userImage: req.file.path,
  });
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/user/uploadfiles", upload.single("file"), (req, res) => {
  console.log(req.file);
  return res.json({ success: true, url: res.req.file.path });
});

app.get("/user", (req, res) => {
  const user = User.find((err, doc) => {
    if (!err) res.json(doc);
  });
});
app.put("/user/:id", (req, res) => {
  const user = User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) res.json(doc);
    }
  );
});

app.get("/user/chat", (req, res) => {
  const chat = Chat.find((err, doc) => {
    if (!err) res.json(doc);
  });
});

io.on("connection", (socket) => {
  socket.on("Input Chat Message", (msg) => {
    console.log(msg);
    const chat = Chat({
      message: msg.chatMessage,
      type: msg.type,
      sender: msg.sender,
      reciever: msg.reciever,
    });
    chat.save().then(() => {
      const chat1 = Chat.find((err, doc) => {
        if (!err) io.emit("Output Chat Message", doc);
      });
    });
  });

  socket.on("edit chat message", (msg) => {
    console.log(msg);
    const data = { message: msg.message };
    const user = Chat.findOneAndUpdate(
      { _id: msg.id },
      data,
      { new: true },
      (err, doc) => {
        if (!err) {
          const chat1 = Chat.find((err, doc) => {
            if (!err) io.emit("Output Chat Message", doc);
          });
        }
      }
    );
  });

  // socket.on("delete chat one message", (msg) => {
  //   console.log(msg);
  //   let vari = msg.data
  //   const data = { vari: "" };
  //   const user = Chat.findOneAndUpdate(
  //     { _id: msg.id },
  //     data,
  //     { new: true },
  //     (err, doc) => {
  //       if (!err) {
  //         const chat1 = Chat.find((err, doc) => {
  //           if (!err) io.emit("Output Chat Message", doc);
  //         });
  //       }
  //     }
  //   );
  // });

  socket.on("delete chat message", (msg) => {
    console.log(msg);
    const user = Chat.findByIdAndRemove(msg.id, (err, doc) => {
      if (!err) {
        const chat1 = Chat.find((err, doc) => {
          if (!err) io.emit("Output Chat Message", doc);
        });
      }
    });
  });
});
// app.post("/user/:id/chat", (req, res) => {
//   const user = User.findOneAndUpdate(
//     { _id: req.params.id },
//     { $push: { chat: req.body } },
//     { new: true },
//     (err, doc) => {
//       if (!err) res.send("message sent");
//     }
//   );
// });
app.delete("/user/:id", (req, res) => {
  const user = User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) res.json(doc);
  });
});

app.get("/user/:id", (req, res) => {
  const user = User.findById(req.params.id, (err, doc) => {
    if (!err) res.json(doc);
  });
});
app.post("/login", (req, res) => {
  const user = User.findOne({ userName: req.body.userName }, (err, doc) => {
    if (!err) {
      doc === null
        ? res.send("You don't have a account")
        : doc.password === req.body.password
        ? res.send({
            userId: doc._id,
            userName: doc.userName,
            userImage: doc.userImage,
          })
        : res.send("Invalid credentials");
    }
  });
});
server.listen(PORT);
console.log("listing on port", PORT);
