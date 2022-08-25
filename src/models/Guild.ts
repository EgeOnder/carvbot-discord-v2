import { Schema, model } from 'mongoose';

export interface GuildInterface {
	guild_id: string;
	guild_name: string;
	voice_channel: boolean;
	created_at: Date;
}

const guildSchema = new Schema({
	guild_id: { type: String, unique: true },
	guild_name: String,
	voice_channel: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now() },
});

export default model<GuildInterface>('Guild', guildSchema);
