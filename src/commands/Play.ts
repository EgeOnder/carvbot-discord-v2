import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../types/Command';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { SUCCESS_COLOR, YOUTUBE_API_KEY } from '../config/constants';
import { createError } from '../utils/createError';
import { connectVoice } from '../utils/connectVoice';
import ytdl from 'ytdl-core';
import {
	AudioPlayerStatus,
	createAudioPlayer,
	createAudioResource,
} from '@discordjs/voice';

interface Response {
	id: {
		videoId: string;
	};
	snippet: {
		thumbnails: { default: { url: string } };
		title: string;
		description: string;
		channelTitle: string;
	};
}

export const Play: Command = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays the query specified')
		.addStringOption(option =>
			option
				.setName('query')
				.setDescription(
					'Specify either a search query or a direct link',
				)
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('volume')
				.setDescription('Set the volume of played track')
				.setRequired(false),
		),
	run: async interaction => {
		await interaction.deferReply();

		const { user, guild } = interaction;

		const voiceChannel = guild?.members.cache.get(interaction.user.id)
			?.voice.channel;

		if (!voiceChannel) {
			await interaction.editReply({
				embeds: [
					createError(
						'You must be in a voice channel to run this command!',
					),
				],
			});

			return;
		}

		let url = '';
		const query = interaction.options.getString('query', true);
		const volume = interaction.options.getString('volume', false);

		if (volume && isNaN(parseInt(volume))) {
			await interaction.editReply({
				embeds: [createError('Volume should be an integer')],
			});
		}

		const regex = /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
		if (regex.test(query)) url = query;

		if (url === '')
			await axios
				.get(
					`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1&q=${encodeURI(
						query,
					)}`,
				)
				.then(async response => {
					if (response.data?.items.length > 0) {
						response.data.items.forEach(async (video: Response) => {
							const newVideo = new MessageEmbed()
								.setTitle('New video queued!')
								.setThumbnail(
									video.snippet.thumbnails.default.url,
								)
								.addField(
									video.snippet.title,
									video.snippet.description,
								)
								.setAuthor({
									name: user.tag,
									iconURL: user.displayAvatarURL(),
								})
								.setColor(SUCCESS_COLOR);

							url = `https://youtube.com/watch?v=${video.id.videoId}`;

							await interaction.editReply({
								embeds: [newVideo],
							});
						});
					} else {
						await interaction.editReply({
							embeds: [
								createError('No video can be found!', user),
							],
						});

						return;
					}
				});

		const stream = ytdl(url, { filter: 'audioonly' });
		const player = createAudioPlayer();
		const resource = createAudioResource(stream);
		if (volume) resource.volume?.setVolume(parseInt(volume));
		const connection = connectVoice(voiceChannel.id, guild);
		connection.subscribe(player);
		player.play(resource);

		player.on(AudioPlayerStatus.Idle, () => connection.destroy());
	},
};
