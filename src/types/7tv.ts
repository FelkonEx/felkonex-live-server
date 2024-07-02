export type Emote = {
    id: string;
    name: string;
    data: EmoteData;
};

export type EmoteData = {
    id: string;
    name: string;
    owner: {
        username: string;
        display_name: string;
    };
    host: {
        url: string;
    };
};

export type MappedEmote = {
    name: string;
    username: string;
    url: string;
};
