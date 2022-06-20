import { Schema, model } from 'mongoose';

export interface UserInterface {
	discordId: string;
	points: number;
	created_at: Date;
	updated_at: Date;
}

const userSchema = new Schema({
	discord_id: String,
	points: Number,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export default model<UserInterface>('User', userSchema);
