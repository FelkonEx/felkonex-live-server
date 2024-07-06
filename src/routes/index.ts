import { Router } from "express";
import { sevenTvRoutes } from "./sevenTvRoutes";
import { youtubeRoutes } from "./youtubeRoutes";
import { twitchRoutes } from "./twitchRoutes";

export const routes = Router();

routes.use("/7tv", sevenTvRoutes);
routes.use("/yt", youtubeRoutes);
routes.use("/twitch", twitchRoutes);
