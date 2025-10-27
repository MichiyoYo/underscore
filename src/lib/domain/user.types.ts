// user & authentication

import { BookAnalysis } from './analysis.types';
import { Playlist } from './playlist.types';

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
  connectedServices: ConnectedServices;
  preferences: UserPreferences;
}

export interface ConnectedServices {
  goodReads?: GoodreadsConnection;
  spotify?: SpotifyConnection;
  appleMusic?: AppleMusicConnection;
  youtubeMusic?: YoutubeMusicConnection;
}

export interface UserPreferences {}

export interface ServiceConnection {
  connectedAt: Date;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  userId: string; // ID in the external service
}

export interface GoodreadsConnection extends ServiceConnection {
  username: string;
}

export interface SpotifyConnection extends ServiceConnection {
  displayName: string;
}

export interface AppleMusicConnection extends ServiceConnection {
  storefrontId: string;
}

export interface YoutubeMusicConnection extends ServiceConnection {
  channelId: string;
}

export type MusicServiceType = 'spotify' | 'apple-music' | 'youtube-music';

export interface UserPreferences {
  defaultMusicService?: MusicServiceType;
  autoGeneratePlaylists: boolean;
  instrumentalOnly: boolean;
  playlistLength: 'short' | 'medium' | 'long'; // ~30min, ~1hr, ~2hr
}

// user's book library
export type ReadingStatus =
  | 'want-to-read'
  | 'currently-reading'
  | 'finished'
  | 'did-not-finish';

export interface UserBook {
  id: string;
  userId: string;
  bookId: string;
  status: ReadingStatus;
  progress?: number;
  currentPage?: number;
  startedAt?: Date;
  finishedAt?: Date;
  // AI-generated content
  analysis?: BookAnalysis;
  playlists: Playlist[];

  createdAt: Date;
  updatedAt: Date;
}
