export interface SevenTvApiEmote {
    id: string;
    name: string;
    data: SevenTvApiEmoteData;
}

export interface SevenTvApiEmoteData {
    id: string;
    name: string;
    owner: {
        username: string;
        displayName: string;
    };
    host: {
        url: string;
    };
}

export interface SevenTvEmoteMap {
    name: string;
    username: string;
    url: string;
}
