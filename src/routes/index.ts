import { Router } from "express";
import { sevenTvRoutes } from "./sevenTvRoutes";
import { youtubeRoutes } from "./youtubeRoutes";

export const routes = Router();

routes.use("/7tv", sevenTvRoutes);
routes.use("/yt", youtubeRoutes);
