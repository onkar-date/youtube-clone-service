const express = require("express");
const youtubeRouter = express.Router();

youtubeRouter.get("/search", (req, res) => {
  res.send("works");
});

module.exports = youtubeRouter;
