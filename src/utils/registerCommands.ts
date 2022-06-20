import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { CommandList } from '../commands/_CommandList';
import { APPLICATION_ID, BOT_TOKEN, REST_VERSION } from '../config/constants';

export const registerCommands = async (guildId: string) => {
	const rest = new REST({ version: REST_VERSION }).setToken(
		BOT_TOKEN as string,
	);

	const commandData = CommandList.map(command => command.data.toJSON());

	await rest
		.put(Routes.applicationGuildCommands(APPLICATION_ID, guildId), {
			body: commandData,
		})
		.then(() => console.log('Application commands updated'))
		.catch(error => {
			if (error.code === 50001) console.log(error.message);
		});
};
