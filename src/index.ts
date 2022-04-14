import { Client, Interaction } from 'discord.js';
import { clientConfig } from './config/client.config';
import { BOT_TOKEN, MONGODB_URL } from './config/constants';
import { onInteraction } from './events/onInteraction';
import { onReady } from './events/onReady';
import { connectDb } from './utils/connectDb';

(async () => {
	const client = new Client(clientConfig);

	await connectDb(MONGODB_URL);

	client.on('ready', async () => await onReady(client));
	client.on('interactionCreate', async (interaction: Interaction) => {
		await onInteraction(interaction);
	});

	await client.login(BOT_TOKEN);
})();
