// AI analysis
export interface BookAnalysis {
  id: string;
  userBookId: string;
  analyzedAt: Date;

  // Extracted attributes
  mood: Mood[];
  themes: string[];
  setting: Setting;
  pace: 'slow' | 'moderate' | 'fast';
  intensity: 'light' | 'moderate' | 'intense';
  timeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[];

  // AI-generated descriptions
  vibe: string; // Short description of the book's atmosphere
  musicDescription: string; // What kind of music would fit

  // Analysis metadata
  analysisSource: 'metadata-only' | 'full-content';
  confidence: number; // 0-1, how confident is the AI
  modelUsed: string; // e.g., "gpt-4", "claude-3-opus"
}

export interface Mood {
  name: string; // e.g., "melancholic", "hopeful", "tense"
  intensity: number; // 0-1
}

export interface Setting {
  era?: string; // e.g., "contemporary", "victorian", "future"
  location?: string; // e.g., "urban", "rural", "fantasy-world"
  atmosphere?: string; // e.g., "cozy", "dystopian", "magical"
}
