export type TwitchEmoteData = {
    id?: string,
    name?: string,
    images?: {
        url_1x?: string,
        url_2x?: string,
        url_4x?: string,
    }
    emote_type?: string,
    format: string[],
}

export type TwitchEmoteMap = {
    name?: string,
    image_url?: string,
    emote_type?: string,
    format?: string
}