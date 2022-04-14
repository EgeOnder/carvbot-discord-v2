import { UserInterface } from '../types/UserInterface';

export const updateUserData = async (
	User: UserInterface,
	points: number,
): Promise<UserInterface> => {
	User.updated_at = new Date();
	User.points += points;

	try {
		await User.save();
	} catch (error) {
		return error.message;
	}

	return User;
};
