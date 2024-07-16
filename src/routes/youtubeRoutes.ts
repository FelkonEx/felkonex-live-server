import { Request, Response, Router } from "express";
import axios from "axios";
import { QueryResult } from "pg";
import { decode } from "html-entities";

import {
    YoutubeApiVideoData,
    YoutubeVideoDto,
    YoutubeApiVideoThumbnailObj,
    YoutubeVideoEntity
} from "types";

import pool from "../db/db";
import { DB_TABLE_NAME_HIGHLIGHTS, DB_TABLE_NAME_STREAMS } from "../config";
import { constants } from "../utils";

export const youtubeRoutes = Router();

youtubeRoutes.get("/compilations", async (req: Request<{}>, resp: Response) => {
    try {
        const returnedVideos: QueryResult<YoutubeVideoEntity> =
            await pool.query(
                constants.sql.SELECT_VIDEOS_QUERY.replace(
                    "{0}",
                    DB_TABLE_NAME_HIGHLIGHTS
                )
            );
        const videoDto: Array<YoutubeVideoEntity> = returnedVideos.rows;
        resp.send(mapVideoEntityToDto(videoDto));
    } catch (error) {
        console.error(error);
        resp.status(500).send(
            "An error occurred while trying to fetch data from YouTube API"
        );
    }
});

youtubeRoutes.get("/vods", async (req: Request<{}>, resp: Response) => {
    try {
        const returnedVideos: QueryResult<YoutubeVideoEntity> =
            await pool.query(
                constants.sql.SELECT_VIDEOS_QUERY.replace(
                    "{0}",
                    DB_TABLE_NAME_STREAMS
                )
            );

        const videoDto: Array<YoutubeVideoEntity> = returnedVideos.rows;

        resp.send(mapVideoEntityToDto(videoDto));
    } catch (error) {
        console.error(error);
        resp.status(500).send(
            "An error occurred while trying to fetch data from YouTube API"
        );
    }
});

youtubeRoutes.post("/vods", async (req: Request<{}>, resp: Response) => {
    try {
        const mappedVideos: Array<YoutubeVideoDto> = await fetchYtVideos(
            constants.youtube.CHANNEL_ID_VODS
        );

        mappedVideos.forEach(async (video) => {
            await pool.query(
                constants.sql.INSERT_VIDEO_QUERY.replace(
                    "{0}",
                    DB_TABLE_NAME_STREAMS
                ),
                [
                    video.videoId,
                    video.thumbnailUrl,
                    video.title,
                    video.publishedAt
                ]
            );
        });
        resp.sendStatus(200);
    } catch {
        resp.status(500).send(
            "An error occurred while trying to update youtube compilations"
        );
    }
});

youtubeRoutes.post(
    "/compilations",
    async (req: Request<{}>, resp: Response) => {
        try {
            const mappedVideos: Array<YoutubeVideoDto> = await fetchYtVideos(
                constants.youtube.CHANNEL_ID_COMPILATIONS
            );
            mappedVideos.forEach(async (video) => {
                await pool.query(
                    constants.sql.INSERT_VIDEO_QUERY.replace(
                        "{0}",
                        DB_TABLE_NAME_HIGHLIGHTS
                    ),
                    [
                        video.videoId,
                        video.thumbnailUrl,
                        video.title,
                        video.publishedAt
                    ]
                );
            });
            resp.sendStatus(200);
        } catch {
            resp.status(500).send(
                "An error occurred while trying to update youtube compilations"
            );
        }
    }
);

// --- API Call

async function fetchYtVideos(
    youtubeChannelId: string
): Promise<YoutubeVideoDto[]> {
    const response = await axios.get(constants.url.API_YOUTUBE_PLAYLIST_ITEMS, {
        params: {
            part: "snippet",
            maxResults: 50,
            key: process.env.API_KEY_YT,
            playlistId: youtubeChannelId,
            order: "date"
        }
    });
    const videos: YoutubeApiVideoData[] = response.data.items;

    const mappedVideos: YoutubeVideoDto[] = videos.map(
        (video: YoutubeApiVideoData) => ({
            videoId: video.snippet?.resourceId?.videoId,
            title: decode(video.snippet?.title),
            thumbnailUrl: returnThumbnailUrl(video),
            publishedAt: video.snippet?.publishedAt
        })
    );
    return mappedVideos;
}

// --- Util Functions

const mapVideoEntityToDto = (videos: Array<YoutubeVideoEntity>) =>
    videos.map((field: YoutubeVideoEntity) => ({
        videoId: field.video_id,
        title: field.title,
        thumbnailUrl: field.thumbnail_url,
        publishedAt: field.published_at
    }));

function returnThumbnailUrl(video: YoutubeApiVideoData) {
    if (!video.snippet?.thumbnails) {
        return "";
    }
    const thumbnails: YoutubeApiVideoThumbnailObj = video.snippet?.thumbnails;

    return (
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url
    );
}
