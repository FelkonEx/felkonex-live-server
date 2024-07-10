// from Twitch API
export type TwitchApiEmote = {
    id: string;
    name: string;
    images: {
        url_1x: string;
        url_2x: string;
        url_4x: string;
    };
    emote_type: string;
    format: string[];
};

export type TwitchEmoteMap = {
    name: string;
    imageUrl: string;
    emoteType: string;
    format: string;
};
