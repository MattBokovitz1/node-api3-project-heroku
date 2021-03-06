const express = require("express");

const router = express.Router();

const Post = require("./posts-model");

const { validatePostId } = require("../middleware/middleware");

router.get("/", (req, res) => {
  Post.get(req.query)
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "the posts could not be retrieved" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  Post.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "the post has been removed " });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "error removing the post" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "please provide text for the post" });
  }

  Post.update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "error updating the post" });
    });
});

module.exports = router;
