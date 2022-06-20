import { Client } from 'discord.js';
import { registerCommands } from '../utils/registerCommands';
import Guild from '../models/Guild';

export const onReady = async (client: Client) => {
	client.user?.setPresence({
		activities: [{ name: '/play', type: 'LISTENING' }],
	});

	const guilds = await Guild.find();
	guilds.forEach(async guild => {
		const id = guild.guild_id;

		await registerCommands(id);
	});
};
