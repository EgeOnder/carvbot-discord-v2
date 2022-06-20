import { ClientOptions } from 'discord.js';

export const clientConfig = {
	intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'],
} as ClientOptions;
