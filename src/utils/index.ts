import { CHANNEL_ID_COMPILATIONS, CHANNEL_ID_VODS } from "./constants/youtube";
import { INSERT_VIDEO_QUERY, SELECT_VIDEOS_QUERY } from "./constants/sql";

const sql = {
    INSERT_VIDEO_QUERY,
    SELECT_VIDEOS_QUERY
};

const youtube = {
    CHANNEL_ID_COMPILATIONS,
    CHANNEL_ID_VODS
};

export { sql, youtube };
