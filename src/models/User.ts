import { Schema, model } from 'mongoose';
import { UserInterface } from '../types/UserInterface';

export const User = new Schema({
	discord_id: String,
	points: Number,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export default model<UserInterface>('user', User);
