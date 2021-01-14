// custom middleware

const Post = require("../posts/posts-model");
const User = require("../users/users-model");

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

function validateUserId(req, res, next) {
  User.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "error retrieving the user" });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  Post.getById(req.params.id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "error retrieving the post" });
    });
}

module.exports = {
  validatePost,
  validatePostId,
  logger,
  validateUser,
  validateUserId,
};
