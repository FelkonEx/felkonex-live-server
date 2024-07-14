export type YoutubeApiVideoData = {
    snippet?: {
        title?: string;
        publishedAt: Date;
        thumbnails?: YoutubeApiVideoThumbnailObj;
        resourceId?: {
            videoId?: string;
        };
    };
};

export type YoutubeApiVideoThumbnailObj = {
    default?: YoutubeApiVideoThumbnail;
    medium?: YoutubeApiVideoThumbnail;
    high?: YoutubeApiVideoThumbnail;
    standard?: YoutubeApiVideoThumbnail;
    maxres?: YoutubeApiVideoThumbnail;
};

export type YoutubeApiVideoThumbnail = {
    url?: string;
    width?: number;
    height?: number;
};

export type YoutubeVideoDto = {
    videoId?: string;
    title?: string;
    thumbnailUrl?: string;
    publishedAt?: Date;
};

export type YoutubeVideoEntity = {
    video_id?: string;
    title?: string;
    thumbnail_url?: string;
    published_at?: Date;
};
