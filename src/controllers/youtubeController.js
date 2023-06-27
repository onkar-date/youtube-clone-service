const youtubeService = require("../services/youtubeService");

const youtubeController = {};

youtubeController.searchVideos = async (req, res, next) => {
    if (req.query.relatedVideoId) {
        getSuggestedVideos(req, res, next);
    } else {
        searchByQuery(req, res, next);
    }
}

const searchByQuery = async (req, res, next) => {
    try {
        const searchString = req.query.q;
        if (!searchString) {
            const err = new Error('Please provide search string!');
            throw err;
        }
        const part = req.query.part || 'snippet';
        const maxResults = req.query.maxResults || 50;
        const videos = await youtubeService.fetchVideosByQuery(searchString, part, maxResults);
        res.send(videos);
    } catch (err) {
        next(err);
    }
}

youtubeController.getVideoDetails = async (req, res, next) => {
    try {
        const videoId = req.query.id;
        if (!videoId) {
            const err = new Error('Please provide video ID!');
            throw err;
        }
        const part = req.query.part || 'snippet,contentDetails,statistics';
        const videoDetails = await youtubeService.getVideoDetails(videoId, part);
        res.send(videoDetails);
    } catch (err) {
        next(err);
    }
}

youtubeController.getChannelDetails = async (req, res, next) => {
    try {
        const channelId = req.query.id;
        if (!channelId) {
            const err = new Error('Please provide channel ID!');
            throw err;
        }
        const part = req.query.part || 'snippet,statistics';
        const channelDetails = await youtubeService.getChannelDetails(channelId, part);
        res.send(channelDetails);
    } catch (err) {
        next(err);
    }
}

const getSuggestedVideos = async (req, res, next) => {
    try {
        const relatedVideoId = req.query.relatedVideoId;
        if (!relatedVideoId) {
            const err = new Error('Please provide video ID!');
            throw err;
        }
        const part = req.query.part || 'snippet,id';
        const channelDetails = await youtubeService.getSuggestedVideos(relatedVideoId, part);
        res.send(channelDetails);
    } catch (err) {
        next(err);
    }
}

module.exports = youtubeController;