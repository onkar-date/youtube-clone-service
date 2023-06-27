const express = require("express");
const youtubeController = require("../controllers/youtubeController");
const youtubeRouter = express.Router();

youtubeRouter.get("/search", youtubeController.searchVideos);
youtubeRouter.get("/videos", youtubeController.getVideoDetails);
youtubeRouter.get("/channels", youtubeController.getChannelDetails);

module.exports = youtubeRouter;
