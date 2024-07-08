import { Request, Response, Router } from "express";
import { decode } from "html-entities";
import axios from "axios";

import { YoutubeVideoItem, YoutubeVideoMap } from "types/types";

const YT_CHANNEL_ID_COMPILATIONS_PLAYLIST_ID: string = "UUKIEMpmi0mxRDIognD3Ejng"; //FelkonEx
const YT_CHANNEL_ID_VODS_PLAYLIST_ID: string = "UUhC6tyjv8akwjVNdpx4-76Q";
const YT_API_KEY: string = "AIzaSyCzR9_nR2isugtHkxzpd91s9pm_awBbzEM";

export const youtubeRoutes = Router();

youtubeRoutes.get("/compilations", async (req: Request<{}>, resp: Response) => {
    fetchYoutubeVideos(YT_CHANNEL_ID_COMPILATIONS_PLAYLIST_ID, resp)
});

youtubeRoutes.get("/vods", async (req: Request<{}>, resp: Response) => {
    fetchYoutubeVideos(YT_CHANNEL_ID_VODS_PLAYLIST_ID, resp)
});

async function fetchYoutubeVideos(youtubeChannelId: string, resp: Response) {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
            {
                params: {
                    part: "snippet",
                    maxResults: 50,
                    key: YT_API_KEY,
                    playlistId: youtubeChannelId,
                    order: "date",
                },
            }
        );
        const videos: YoutubeVideoItem[] = response.data.items;

        const mappedVideos: YoutubeVideoMap[] = videos.map((video) => ({
            videoId: video.snippet?.resourceId?.videoId,
            title: decode(video.snippet?.title),
            thumbnailUrl: video.snippet?.thumbnails?.maxres?.url || video.snippet?.thumbnails?.default?.url
        }));

        resp.send(mappedVideos);
    } catch (error) {
        console.error(error);
        resp.status(500).send(
            "An error occurred while trying to fetch data from YouTube API"
        );
    }
}