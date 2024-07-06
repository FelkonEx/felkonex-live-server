import { Request, Response, Router } from "express";
import { decode } from "html-entities";
import axios from "axios";

import { TwitchEmoteData, TwitchEmoteMap } from "types/types";

const CLIENT_ID: string = "u8jn1r8skjlcl1wv6botpcn70kxbr4"; //FelkonEx
const CLIENT_SECRET: string = "i7toz4tffsifsvujint2i0hyjwfmat"; //FelkonExArchive
const BROADCAST_ID: string = "103337867"; //FelkonExArchive

export const twitchRoutes = Router();

twitchRoutes.get("/emotes", async (req: Request<{}>, resp: Response) => {
    try {
        const bearerToken: string = await getOauthToken(resp);

        const response = await axios.get(
            "https://api.twitch.tv/helix/chat/emotes",
            {
                params: {
                    broadcaster_id: BROADCAST_ID,
                },
                headers: {
                    Authorization: "Bearer " + bearerToken,
                    "Client-Id": CLIENT_ID,
                },
            }
        );
        const emoteData: TwitchEmoteData[] = response.data.data;
        const mappedTwitchEmotes: TwitchEmoteMap[] = emoteData.map((emote) => ({
            name: emote.name,
            image: emote.images?.url_4x
                ?.replace("/static/", "/default/")
                .replace("light", "dark"),
            emote_type: emote.emote_type,
            format: emote.format.find((element) => element === "animated")
                ? "animated"
                : "static",
        }));

        resp.send(mappedTwitchEmotes);
    } catch (error) {
        console.error(error);
        resp.status(500).send(
            "An error occurred while trying to fetch twitch oAuth"
        );
    }
});

// twitchRoutes.get("/oauth", async (req: Request<{}>, resp: Response) => {
//     try {
//         const response = await axios.post(
//             "https://id.twitch.tv/oauth2/token",
//             null,
//             {
//                 params: {
//                     client_id: CLIENT_ID,
//                     client_secret: CLIENT_SECRET,
//                     grant_type: "client_credentials",
//                     scope: "channel:read:redemptions",
//                 },
//             }
//         );
//         resp.send(response.data.access_token);
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send(
//             "An error occurred while trying to fetch twitch oAuth"
//         );
//     }
// });

const getOauthToken = async (resp: Response): Promise<string> => {
    const response = await axios.post(
        "https://id.twitch.tv/oauth2/token",
        null,
        {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "client_credentials",
                scope: "channel:read:redemptions",
            },
        }
    );

    return response.data.access_token;
};
