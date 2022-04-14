import { UserInterface } from '../types/UserInterface';
import UserModel from '../models/User';

export const getUserData = async (id: string): Promise<UserInterface> => {
	const userData =
		(await UserModel.findOne({ discordId: id })) ||
		(await UserModel.create({
			discordId: id,
			points: 0,
		}));

	return userData;
};
