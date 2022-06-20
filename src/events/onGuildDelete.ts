import { Guild } from 'discord.js';
import GuildModel from '../models/Guild';

export const onGuildDelete = async (guild: Guild) => {
	const getGuild = await GuildModel.findOne({ guild_id: guild.id });
	if (getGuild) {
		await GuildModel.deleteOne({ guild_id: guild.id })
			.then(() =>
				console.log(
					'Guild with ID ' +
						guild.id +
						' and name ' +
						guild.name +
						' was removed!',
				),
			)
			.catch(error => console.log(error));
	}
};
