import dotenv from 'dotenv';
dotenv.config();

export const BOT_TOKEN = process.env.DISCORD_TOKEN;
export const MONGODB_URL: string = process.env?.MONGODB_CONNECT ?? '';
export const APPLICATION_ID: string = process.env.APPLICATION_ID ?? '';
export const REST_VERSION = '9';
export const YOUTUBE_API_KEY: string = process.env.YOUTUBE_API_KEY ?? '';
export const SUCCESS_COLOR = '#3ffc72';
export const ERROR_COLOR = '#d60015';
