import { Command } from '../types/Command';
import { Ping } from './ping';
import { Play } from './Play';
import { Stop } from './Stop';

export const CommandList: Command[] = [Ping, Play, Stop];
