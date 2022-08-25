import {
	AudioPlayerStatus,
	createAudioPlayer,
	createAudioResource,
	DiscordGatewayAdapterCreator,
	joinVoiceChannel,
	VoiceConnection,
} from '@discordjs/voice';
import { Guild } from 'discord.js';
import internal from 'stream';

export let connection: VoiceConnection;

export const voiceConnection = async (
	voiceChannelId: string,
	stream: internal.Readable | null,
	guild: Guild,
) => {
	const player = createAudioPlayer();
	connection = joinVoiceChannel({
		channelId: voiceChannelId,
		guildId: guild.id,
		adapterCreator:
			guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
		selfDeaf: true,
		selfMute: false,
	});

	if (!stream) return;
	const resource = createAudioResource(stream);
	const subscription = connection.subscribe(player);
	player.play(resource);
	player.on(AudioPlayerStatus.Idle, () => {
		connection.destroy();
		subscription?.unsubscribe();
	});
	player.on('error', err => console.log(err));
};
