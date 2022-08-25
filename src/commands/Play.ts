import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../types/Command';
import { createError } from '../utils/createError';
import ytdl from 'ytdl-core';
import { voiceConnection } from '../utils/voiceConnection';
import { isUserInVoice } from '../utils/isUserInVoice';
import { youtubeSearch } from '../utils/youtubeSearch';

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
		),
	run: async interaction => {
		await interaction.deferReply();

		const { user, guild } = interaction;

		if (!guild) {
			createError(interaction, 'Guild not found!');
			return;
		}
		const voiceChannel = isUserInVoice(user, guild);

		if (!voiceChannel) {
			createError(
				interaction,
				'You must be in a voice channel to run this command!',
			);

			return;
		}

		const query = interaction.options.getString('query', true);

		const url = await youtubeSearch(interaction, query, user);

		if (!url) return;

		const stream = ytdl(url, { filter: 'audioonly' });
		voiceConnection(voiceChannel.id, stream, guild);
	},
};
