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
        files: Array<FileName>;
    };
};

export type MappedEmote = {
    name: string;
    username: string;
    url: string;
    fileName?: FileName
};

export type FileName = {
    name: string;
    static_name: string;
    width: number;
    height: number;
    format: string;
};
