export type YoutubeVideoMap = {
    videoId?: string;
    title?: string;
    thumbnailUrl?: string;
};

export type YoutubeVideoItem = {
    snippet?: {
        title?: string;
        thumbnails?: {
            default?: YoutubeThumbnailInfo;
            medium?: YoutubeThumbnailInfo;
            high?: YoutubeThumbnailInfo;
            standard?: YoutubeThumbnailInfo;
            maxres?: YoutubeThumbnailInfo;
        };
        resourceId?: {
            videoId?: string;
        };
    };
};

export type YoutubeThumbnailInfo = {
    url?: string;
    width?: number;
    height?: number;
};
