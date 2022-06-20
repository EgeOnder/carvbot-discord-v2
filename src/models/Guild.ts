import { Schema, model } from 'mongoose';

export interface GuildInterface {
	guild_id: string;
	guild_name: string;
	created_at: Date;
}

const guildSchema = new Schema({
	guild_id: { type: String, unique: true },
	guild_name: String,
	created_at: { type: Date, default: Date.now() },
});

export default model<GuildInterface>('Guild', guildSchema);
