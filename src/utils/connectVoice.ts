import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel,
} from '@discordjs/voice';
import { Guild } from 'discord.js';

export const connectVoice = (channelId: string, guild: Guild) => {
	return joinVoiceChannel({
		channelId,
		guildId: guild.id,
		adapterCreator:
			guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
	});
};
