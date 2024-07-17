export const INSERT_VIDEO_QUERY: string =
    "INSERT INTO {0} (video_id, thumbnail_url, title, published_at) VALUES ($1, $2, $3, $4) ON CONFLICT(video_id) DO UPDATE SET thumbnail_url = EXCLUDED.thumbnail_url, title = EXCLUDED.title, published_at = EXCLUDED.published_at;";

export const SELECT_VIDEOS_QUERY: string =
    "SELECT * FROM {0} ORDER BY published_at DESC";
