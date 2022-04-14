import { Document } from 'mongoose';

export interface UserInterface extends Document {
	discordId: string;
	points: number;
	created_at: Date;
	updated_at: Date;
}
