import { Request, Response, Router } from "express";
import axios from "axios";
import { SevenTvApiEmote, SevenTvEmoteMap } from "types";

const URL_7TV_EMOTE: string =
    "https://7tv.io/v3/emote-sets/614e8d416251d7e000da7c8e";

export const sevenTvRoutes = Router();

sevenTvRoutes.get("/emotes", async (req: Request<{}>, resp: Response) => {
    fetchSevenTvEmotes(resp);
});

async function fetchSevenTvEmotes(resp: Response) {
    try {
        const sevenTvResp = await axios.get(URL_7TV_EMOTE);
        const emotes: SevenTvApiEmote[] = sevenTvResp.data.emotes;

        const mappedEmotes: SevenTvEmoteMap[] = emotes.map(
            (emote: SevenTvApiEmote) => ({
                name: emote.name,
                username: emote.data.owner.username,
                url:
                    "https:" +
                    emote.data.host.url +
                    "/" +
                    emote.data.host.files.at(-1)?.name
            })
        );

        mappedEmotes.sort((a: SevenTvEmoteMap, b: SevenTvEmoteMap) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        resp.send(mappedEmotes);
    } catch (error) {
        console.error(error);
        resp.status(500).send("An error occurred while calling the API");
    }
}
