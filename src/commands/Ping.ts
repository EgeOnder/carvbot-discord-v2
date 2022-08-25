import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../types/Command';
import { MessageEmbed } from 'discord.js';

export const Ping: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Testing command')
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('Testing message')
				.setRequired(true),
		),
	run: async interaction => {
		await interaction.deferReply();

		const { user } = interaction;
		const text = interaction.options.getString('message', true);

		const userInfoEmbed = new MessageEmbed()
			.setTitle('User Info')
			.setDescription(text)
			.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() });

		await interaction.editReply({ embeds: [userInfoEmbed] });
	},
};
