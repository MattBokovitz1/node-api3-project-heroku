const express = require("express");

const router = express.Router();
const User = require("./users-model");
const Post = require("../posts/posts-model");

const {
  validatePost,
  validateUser,
  validateUserId,
} = require("../middleware/middleware");

router.post("/", validateUser, (req, res) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error creating the user" });
    });
});

router.get("/", (req, res) => {
  User.get(req.query)
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.log(err.message);
      res.status(500).json({ message: "the users could not be retrieved" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.delete("/:id", validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "the user has been removed" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "error removing the user" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "please provide a name for the user" });
  }
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "error updating the user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Post.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error creating the post" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "the user posts could not be retrieved" });
    });
});

// do not forget to export the router
module.exports = router;
