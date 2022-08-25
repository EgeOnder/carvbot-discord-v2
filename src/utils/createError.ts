import { CommandInteraction, MessageEmbed, User } from 'discord.js';
import { ERROR_COLOR } from '../config/constants';

export const createError = async (
	interaction: CommandInteraction,
	message: string,
	user?: User,
) => {
	const embed = new MessageEmbed()
		.setTitle(':x: ERROR')
		.setDescription(message)
		.setColor(ERROR_COLOR);

	if (user)
		embed.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() });

	await interaction.editReply({
		embeds: [embed],
	});
};
