// music and playlists
export interface Playlist {
  id: string;
  userBookId: string;
  name: string;
  description?: string;

  // Tracks
  tracks: Track[];
  totalDuration: number; // in seconds

  // Generation info
  generatedAt: Date;
  generationPrompt: string; // What we asked the AI

  // External service IDs (populated when exported)
  spotifyPlaylistId?: string;
  appleMusicPlaylistId?: string;
  youtubeMusicPlaylistId?: string;

  // Metadata
  isActive: boolean; // User's currently selected playlist for this book
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds

  // External service IDs
  spotifyId?: string;
  appleMusicId?: string;
  youtubeMusicId?: string;

  // Track metadata
  isInstrumental?: boolean;
  mood?: string[];
  aiRationale?: string;
}
