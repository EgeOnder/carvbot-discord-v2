import {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';

export interface Command {
	data:
		| Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
		| SlashCommandSubcommandBuilder;
	run: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}
