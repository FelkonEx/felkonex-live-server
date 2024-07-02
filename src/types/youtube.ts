export type YoutubeVideoMap = {
    id?: string;
    title?: string;
    thumbnailUrl?: string;
};

export type YoutubeVideoItem = {
    kind?: string;
    id?: {
        videoId?: string;
    };
    snippet?: {
        title?: string;
        thumbnails?: {
            default?: YoutubeThumbnailInfo;
            medium?: YoutubeThumbnailInfo;
            high?: YoutubeThumbnailInfo;
        };
    };
};

export type YoutubeThumbnailInfo = {
    url?: string;
    width?: number;
    height?: number;
};
