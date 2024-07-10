
export type YoutubeApiVideoData = {
    snippet?: {
        title?: string;
        thumbnails?: {
            default?: YoutubeApiVideoThumbnail;
            medium?: YoutubeApiVideoThumbnail;
            high?: YoutubeApiVideoThumbnail;
            standard?: YoutubeApiVideoThumbnail;
            maxres?: YoutubeApiVideoThumbnail;
        };
        resourceId?: {
            videoId?: string;
        };
    };
};

export type YoutubeApiVideoThumbnail = {
    url?: string;
    width?: number;
    height?: number;
};

export type YoutubeVideoMap = {
    videoId?: string;
    title?: string;
    thumbnailUrl?: string;
};