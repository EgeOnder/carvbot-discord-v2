import dotenv from 'dotenv';
dotenv.config();

export const BOT_TOKEN = process.env.DISCORD_TOKEN;
export const MONGODB_URL: string = process.env?.MONGODB_CONNECT ?? '';
export const REST_VERSION = '9';
