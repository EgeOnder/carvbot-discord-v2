import { REST } from '@discordjs/rest';
import { Client } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { CommandList } from '../commands/_CommandList';
import { BOT_TOKEN, REST_VERSION } from '../config/constants';

export const onReady = async (client: Client) => {
	const rest = new REST({ version: REST_VERSION }).setToken(
		BOT_TOKEN as string,
	);

	const commandData = CommandList.map(command => command.data.toJSON());

	await rest.put(
		Routes.applicationGuildCommands(
			client.user?.id || 'missing id',
			process.env.GUILD_ID as string,
		),
		{ body: commandData },
	);

	console.log('Application commands updated');
};
