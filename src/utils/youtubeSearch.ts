import axios from 'axios';
import { CommandInteraction, MessageEmbed, User } from 'discord.js';
import { SUCCESS_COLOR, YOUTUBE_API_KEY } from '../config/constants';
import { createError } from './createError';

const regex =
	/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export const youtubeSearch = async (
	interaction: CommandInteraction,
	query: string,
	user: User,
): Promise<string | null> => {
	const { data } = await axios.get(
		`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1&q=${
			regex.test(query) ? extractVideoId(query) : query
		}`,
	);

	if (!(data?.items.length > 0)) {
		createError(interaction, 'No video can be found!', user);
		return null;
	}

	const video = data.items[0];
	const url = `https://youtube.com/watch?v=${video.id.videoId}`;
	const newVideo = new MessageEmbed()
		.setTitle('New video queued!')
		.setThumbnail(video.snippet.thumbnails.default.url)
		.addField(video.snippet.title, video.snippet.description)
		.setURL(url)
		.setAuthor({
			name: user.tag,
			iconURL: user.displayAvatarURL(),
		})
		.setColor(SUCCESS_COLOR);

	await interaction.editReply({
		embeds: [newVideo],
	});

	return url;
};

const extractVideoId = (url: string): string | null => {
	return url.split('v=')[1].substring(0, 11);
};
