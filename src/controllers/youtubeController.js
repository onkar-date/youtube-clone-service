const youtubeService = require("../services/youtubeService");
const mockResponse = require('../shared/mock/mockRresponse');
const youtubeController = {};

youtubeController.searchByQuery = async (req, res, next) => {
    try {
        const searchString = req.query.q;
        if (!searchString) {
            const err = new Error('Please provide search string!');
            throw err;
        }
        const part = req.query.part || 'snippet';
        const maxResults = req.query.maxResults || 50;
        if (searchString in mockData) {
            console.log("Returning mock data for [SEARCH QUERY]");
            res.send(mockData[searchString]);
            return;
        }
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
        if (videoId in mockData) {
            console.log("Returning mock data for [WATCH VIDEO]");
            res.send(mockData[videoId]);
            return;
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
        if (channelId in mockData) {
            console.log("Returning mock data for [CHANNEL DETAILS]");
            res.send(mockData[channelId]);
            return;
        }
        const part = req.query.part || 'snippet,statistics';
        const channelDetails = await youtubeService.getChannelDetails(channelId, part);
        res.send(channelDetails);
    } catch (err) {
        next(err);
    }
}

youtubeController.getYoutubeCommentThreads = async (req, res, next) => {
    try {
        const videoId = req.query.videoId;
        if (!videoId) {
            const err = new Error('Please provide video Id');
            throw err;
        }
        if (`comments_${videoId}` in mockData) {
            console.log("Returning mock data for [COMMENTS]");
            res.send(mockData[`comments_${videoId}`]);
            return;
        }
        const part = req.query.part || 'snippet';
        const maxResults = req.query.maxResults || 100;
        const commentThreads = await youtubeService.getVideoCommentThreads(videoId, part, maxResults);
        res.send(commentThreads);
    } catch (err) {
        console.log(`Error while fetching comment threads for video id ${req.query.videoId}`);
        next(err);
    }
}

youtubeController.getRelatedVideos = async (req, res, next) => {
    try {
        const relatedToVideoId = req.query.relatedToVideoId;
        if (!relatedToVideoId) {
            const err = new Error('Please provide video ID!');
            throw err;
        }
        if (`related_${relatedToVideoId}` in mockData) {
            console.log("Returning mock data for [RELATED VIDEO]");
            res.send(mockData[`related_${relatedToVideoId}`]);
            return;
        }
        const part = req.query.part || 'snippet,id';
        const channelDetails = await youtubeService.getRelatedVideos(relatedToVideoId, part);
        res.send(channelDetails);
    } catch (err) {
        next(err);
    }
}

module.exports = youtubeController;

// Mock Data due to limited API calls.
const mockData = {
    Trending: mockResponse.TRENDING_VIDEOS_DATA,
    New: mockResponse.NEW_VIDEOS_DATA,
    Shorts: mockResponse.SHORTS_VIDEOS_DATA,
    Shopping: mockResponse.SHOPPING_VIDEOS_DATA,
    Music: mockResponse.MUSIC_VIDEOS_DATA,
    Movies: mockResponse.MOVIES_VIDEOS_DATA,
    Live: mockResponse.LIVE_VIDEOS_DATA,
    Gaming: mockResponse.GAMING_VIDEOS_DATA,
    News: mockResponse.NEWS_VIDEOS_DATA,
    Sport: mockResponse.SPORTS_VIDEOS_DATA,
    Learning: mockResponse.LEARNING_VIDEOS_DATA,
    "Fashion & Beauty": mockResponse.FASHION_BEAUTY_VIDEOS_DATA,

    // watch video mocks
    odMuBLbWhTM: mockResponse.WATCH_VIDEO_MOCK_odMuBLbWhTM,
    "-QCVMtrDz1w": mockResponse.WATCH_VIDEO_MOCK_QCVMtrDz1w,

    // Channel Mock
    UCPLfrdK84czJXYf6QA7OW9A: mockResponse.CHANNEL_MOCK_UCPLfrdK84czJXYf6QA7OW9A,

    // Related Videos Mock
    "related_-QCVMtrDz1w": mockResponse.SUGGESTED_VIDEOS_QCVMtrDz1w,

    // search result
    dance: mockResponse.SEARCH_RESULT_DANCE,

    // video comments
    "comments_-QCVMtrDz1w": mockResponse.VIDEO_COMMENTS_QCVMtrDz1w
};