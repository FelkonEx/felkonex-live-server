// so typescript doesn't flip when i use the values
import * as dotenv from "dotenv";
dotenv.config();

export const DB_USERNAME = process.env.DB_USERNAME ?? "";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
export const DB_HOST = process.env.DB_HOST ?? "";
export const DB_PORT = process.env.DB_PORT ?? 0;
export const DB_NAME = process.env.DB_NAME ?? "";
export const DB_TABLE_NAME_STREAMS = process.env.DB_TABLE_NAME_STREAMS ?? "";
export const DB_TABLE_NAME_HIGHLIGHTS =
    process.env.DB_TABLE_NAME_HIGHLIGHTS ?? "";
export const API_KEY_YT = process.env.API_KEY_YT ?? "";
