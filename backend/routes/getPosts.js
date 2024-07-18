const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/get-posts", (req, res) => {
  const posts = fs.readFileSync(__dirname + "/posts.json");
  res.send(posts);
});

module.exports = router;
