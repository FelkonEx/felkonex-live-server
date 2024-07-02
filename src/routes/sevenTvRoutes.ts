import { Request, Response, Router } from "express";
import axios from "axios";

import { Emote, MappedEmote } from "types/types";

const URL_7TV_EMOTE: string =
    "https://7tv.io/v3/emote-sets/614e8d416251d7e000da7c8e";

export const sevenTvRoutes = Router();

sevenTvRoutes.get("/emotes/all", async (req: Request<{}>, resp: Response) => {
    fetchSevenTvEmotes(true, resp);
});

sevenTvRoutes.get("/emotes/mine", async (req: Request<{}>, resp: Response) => {
    fetchSevenTvEmotes(false, resp);
});

async function fetchSevenTvEmotes(all: boolean = false, resp: Response) {
    try {
        const sevenTvResp = await axios.get(URL_7TV_EMOTE);
        const emotes: Emote[] = sevenTvResp.data.emotes;

        const mappedEmotes: MappedEmote[] = emotes.map((emote) => ({
            name: emote.name,
            username: emote.data.owner.username,
            url: emote.data.host.url,
        }));

        mappedEmotes.sort((a: MappedEmote, b: MappedEmote) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        if (all) {
            resp.send(mappedEmotes);
        } else {
            resp.send(
                mappedEmotes.filter((emote) => emote.username === "felkonex")
            );
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("An error occurred while calling the API");
    }
}
