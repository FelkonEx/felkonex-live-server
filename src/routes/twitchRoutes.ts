import { Request, Response, Router } from "express";
import axios from "axios";

import { TwitchApiEmote, TwitchEmoteMap } from "types";

const CLIENT_ID: string = "u8jn1r8skjlcl1wv6botpcn70kxbr4";
const CLIENT_SECRET: string = "i7toz4tffsifsvujint2i0hyjwfmat";
const BROADCAST_ID: string = "103337867"; //FelkonEx

export const twitchRoutes = Router();

twitchRoutes.get("/emotes", async (req: Request<{}>, resp: Response) => {
    try {
        const bearerToken: string = await getOauthToken(resp);

        const response = await axios.get(
            "https://api.twitch.tv/helix/chat/emotes",
            {
                params: {
                    broadcaster_id: BROADCAST_ID
                },
                headers: {
                    Authorization: "Bearer " + bearerToken,
                    "Client-Id": CLIENT_ID
                }
            }
        );
        const emoteData: TwitchApiEmote[] = response.data.data;

        const mappedTwitchEmotes: TwitchEmoteMap[] = emoteData.map((emote) => ({
            name: emote.name,
            imageUrl: emote.images?.url_4x
                ?.replace("/static/", "/default/")
                .replace("light", "dark"),
            emoteType: emote.emote_type,
            format: emote.format.find((element) => element === "animated")
                ? "animated"
                : "static"
        }));

        mappedTwitchEmotes.sort((a: TwitchEmoteMap, b: TwitchEmoteMap) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        resp.send(mappedTwitchEmotes);
    } catch (error) {
        console.error(error);
        resp.status(500).send(
            "An error occurred while trying to fetch twitch oAuth"
        );
    }
});

const getOauthToken = async (resp: Response): Promise<string> => {
    const response = await axios.post(
        "https://id.twitch.tv/oauth2/token",
        null,
        {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "client_credentials",
                scope: "channel:read:redemptions"
            }
        }
    );

    return response.data.access_token;
};
