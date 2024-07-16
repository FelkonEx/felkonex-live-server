export const INSERT_VIDEO_QUERY: string =
    "INSERT INTO {0} (video_id, thumbnail_url, title, published_at) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING";

export const SELECT_VIDEOS_QUERY: string =
    "SELECT * FROM {0} ORDER BY published_at DESC";
