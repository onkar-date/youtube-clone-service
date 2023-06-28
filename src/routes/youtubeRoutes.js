const express = require("express");
const youtubeController = require("../controllers/youtubeController");
const youtubeRouter = express.Router();
youtubeRouter.get("/search", youtubeController.searchByQuery);
youtubeRouter.get("/related", youtubeController.getRelatedVideos);
youtubeRouter.get("/videos", youtubeController.getVideoDetails);
youtubeRouter.get("/channels", youtubeController.getChannelDetails);
youtubeRouter.get("/commentThreads", youtubeController.getYoutubeCommentThreads);

module.exports = youtubeRouter;
