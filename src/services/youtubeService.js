
const axios = require("axios");
const headers = {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
};
const youtubeService = {};

youtubeService.fetchVideosByQuery = async (searchQuery, part, maxResults) => {
    const options = {
        params: {
            q: searchQuery,
            part,
            maxResults,
            region: "IN",
        },
        headers,
    };
    console.log(`Started fetching videos for query '${searchQuery}'`);
    const response = await axios.get(
        `${process.env.YOUTUBE_BASE_URL}/search`,
        options
    );
    console.log(`finished fetching videos for query '${searchQuery}'`);
    return response.data;
}

youtubeService.getVideoDetails = async (id, part) => {
    const options = {
        params: {
            id,
            part,
        },
        headers,
    };
    console.log(`Started getting video details for videoId '${id}'`);
    const response = await axios.get(
        `${process.env.YOUTUBE_BASE_URL}/videos`,
        options
    );
    console.log(`finished fetching video details for videoId '${id}'`);
    return response.data;
}

youtubeService.getChannelDetails = async (channelId, part) => {
    const options = {
        params: {
            id: channelId,
            part,
        },
        headers,
    };
    console.log(`Started getting channel details for channelId '${channelId}'`);
    const response = await axios.get(
        `${process.env.YOUTUBE_BASE_URL}/channels`,
        options
    );
    console.log(`finished fetching channel details for channelId '${channelId}'`);
    return response.data;
}

youtubeService.getRelatedVideos = async (relatedToVideoId, part) => {
    const options = {
        params: {
            relatedToVideoId,
            part,
            type: 'video',
            maxResults: 50
        },
        headers,
    };
    console.log(`Started getting videos related to video with ID '${relatedToVideoId}'`);
    const response = await axios.get(
        `${process.env.YOUTUBE_BASE_URL}/search`,
        options
    );
    console.log(`finished getting videos related to video with ID '${relatedToVideoId}'`);
    return response.data;
}

youtubeService.getVideoCommentThreads = async (videoId, part, maxResults) => {
    const options = {
        params: {
            part: 'snippet',
            videoId,
            maxResults
        }, headers
    };
    console.log(`Started fetching video comments for video id ${videoId}`);
    console.log(`Finished fetching video comments for video id ${videoId}`);
    const response = await axios.get(`${process.env.YOUTUBE_BASE_URL}/commentThreads`, options);
    return response.data;
}

module.exports = youtubeService;
