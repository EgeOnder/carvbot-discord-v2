import { Guild } from 'discord.js';
import { registerCommands } from '../utils/registerCommands';
import GuildModel, { GuildInterface } from '../models/Guild';

export const onGuildCreate = async (guild: Guild) => {
	const getGuild = await GuildModel.findOne({ guild_id: guild.id });
	if (!getGuild) {
		await GuildModel.create({
			guild_id: guild.id,
			guild_name: guild.name,
		} as GuildInterface)
			.then(async () => {
				console.log(
					'New guild created with ID ' +
						guild.id +
						' and name ' +
						guild.name +
						'!',
				);

				await registerCommands(guild.id);
			})
			.catch(error => console.log(error));
	}
};
