import { Guild, User } from 'discord.js';

export const isUserInVoice = (user: User, guild: Guild | null) =>
	guild?.members.cache.get(user.id)?.voice.channel;
