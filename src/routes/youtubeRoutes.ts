import { Request, Response, Router } from "express";
import { decode } from "html-entities";
import axios from "axios";

import { YoutubeVideoItem, YoutubeVideoMap } from "types/types";

const YT_CHANNEL_ID_COMPILATIONS: string = "UCKIEMpmi0mxRDIognD3Ejng"; //FelkonEx
const YT_CHANNEL_ID_VODS: string = "UChC6tyjv8akwjVNdpx4-76Q"; //FelkonExArchive

export const youtubeRoutes = Router();

youtubeRoutes.get("/compilations", async (req: Request<{}>, resp: Response) => {
    fetchYoutubeVideos(YT_CHANNEL_ID_COMPILATIONS, resp)
});

youtubeRoutes.get("/vods", async (req: Request<{}>, resp: Response) => {
    fetchYoutubeVideos(YT_CHANNEL_ID_VODS, resp)
});

async function fetchYoutubeVideos(youtubeChannelId: string, resp: Response) {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    maxResults: 1000,
                    key: "AIzaSyCzR9_nR2isugtHkxzpd91s9pm_awBbzEM",
                    channelId: youtubeChannelId,
                    order: "date",
                },
            }
        );

        const videos: YoutubeVideoItem[] = response.data.items;
        const mappedVideos: YoutubeVideoMap[] = videos.map((emote) => ({
            id: emote.id?.videoId,
            title: decode(emote.snippet?.title),
            thumbnailUrl: emote.snippet?.thumbnails?.high?.url,
        }));

        resp.send(mappedVideos);
    } catch (error) {
        console.error(error);
        resp.status(500).send(
            "An error occurred while trying to fetch data from YouTube API"
        );
    }
}