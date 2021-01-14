const express = require("express");
const server = express();
const userRouter = require("./users/users-router");
const postRouter = require("./posts/posts-router");

server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "down", environment: process.env.NODE_ENV });
});

module.exports = server;
