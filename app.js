"use strict";

const express = require("express");
const socket = require("socket.io");

const app = express();

// app config
app.use(express.static("public"));

// route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public" + "/index.html");
});

// server config
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log("Server listening in PORT: " + app.get("port"));
});

// socket.io config
const io = socket(server);

io.on("connection", socket => {
  console.log(`${socket.id} is connected`);
});
