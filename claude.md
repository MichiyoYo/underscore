# Underscore - Technical Requirements Document

## Development Specifications

---

## 📋 Document Overview

**Project Name:** Underscore  
**Version:** 1.0 (MVP)  
**Last Updated:** October 2025  
**Status:** Ready for Development

**Purpose:** Comprehensive technical specifications for building Underscore, including architecture, tech stack, database schema, API specifications, and implementation guidelines.

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                CLIENT (Browser)                     │
│         Next.js App (React + TypeScript)            │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Pages   │  │Components│  │  State   │           │
│  │  Routes  │  │ (UI)     │  │ (React   │           │
│  │          │  │          │  │  Query)  │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼─────────────────────────────┐
│          NEXT.JS API ROUTES (Backend)              │
│                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Use     │  │ Services │  │Repository│          │
│  │  Cases   │  │ External │  │   Data   │          │
│  │          │  │   APIs   │  │  Access  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└────┬──────────────┬──────────────┬─────────────────┘
     │              │              │
     ▼              ▼              ▼
┌──────────┐  ┌─────────────┐  ┌─────────┐
│PostgreSQL│  │External APIs│  │ Storage │
│          │  │             │  │ (Vercel │
│- Users   │  │- OpenAI/    │  │  Blob)  │
│- Books   │  │  Anthropic  │  │         │
│- Lists   │  │- Spotify    │  │- Files  │
│- Analysis│  │- Apple Music│  │- Images │
│          │  │- YouTube    │  │         │
│          │  │- Google     │  │         │
│          │  │  Books      │  │         │
└──────────┘  └─────────────┘  └─────────┘
```

---

## 🔧 Technology Stack

### Frontend

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5.0+ (strict mode)
- **UI Library:** React 18+
- **Styling:** Tailwind CSS 3.4+
- **Components:** shadcn/ui
- **State Management:** TanStack Query (React Query) v5
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend

- **Runtime:** Node.js 20+
- **Framework:** Next.js API Routes
- **Language:** TypeScript 5.0+
- **Database:** PostgreSQL 15+
- **ORM:** Prisma 5+
- **Authentication:** Clerk or NextAuth.js v5
- **Validation:** Zod
- **File Storage:** Vercel Blob

### External Services

- **AI:** OpenAI API (GPT-4) or Anthropic Claude
- **Music:**
  - Spotify Web API
  - Apple Music API (MusicKit JS)
  - YouTube Data API v3
- **Books:**
  - Google Books API
  - Project Gutenberg
  - Open Library API

### Infrastructure

- **Hosting:** Vercel
- **Database:** Supabase or Railway
- **Storage:** Vercel Blob
- **Monitoring:** Vercel Analytics + Sentry
- **Email:** Resend

### Development Tools

- **Package Manager:** pnpm
- **Linting:** ESLint + Prettier
- **Testing:** Vitest + Playwright
- **Git Hooks:** Husky + lint-staged
- **CI/CD:** GitHub Actions + Vercel

---

## 📊 Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// USER & AUTHENTICATION
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  displayName String
  avatarUrl   String?

  emailVerified DateTime?
  accounts      Account[]
  sessions      Session[]

  preferences   Json @default("{}")

  userBooks     UserBook[]
  readingSessions ReadingSession[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

// CONNECTED SERVICES
model ConnectedService {
  id           String   @id @default(cuid())
  userId       String
  serviceType  String

  accessToken  String
  refreshToken String?
  expiresAt    DateTime?

  externalUserId String
  metadata       Json @default("{}")

  connectedAt  DateTime @default(now())
  lastSyncedAt DateTime?

  @@unique([userId, serviceType])
  @@index([userId])
  @@map("connected_services")
}

// BOOKS
model Book {
  id          String   @id @default(cuid())

  title       String
  authors     String[]
  isbn        String?
  isbn13      String?
  publishedDate String?
  publisher   String?
  pageCount   Int?
  language    String   @default("en")
  description String?
  coverImageUrl String?
  genres      String[]
  averageRating Float?
  ratingsCount  Int?

  source      String
  externalId  String?

  isPublicDomain Boolean @default(false)
  fullTextUrl    String?
  downloadFormats Json?

  uploadedFile   UploadedFile?
  userBooks   UserBook[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([source, externalId])
  @@index([source])
  @@index([isPublicDomain])
  @@map("books")
}

model UploadedFile {
  id          String   @id @default(cuid())
  bookId      String   @unique
  book        Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)

  filename    String
  fileType    String
  fileSize    Int
  storageUrl  String
  extractedText String?

  uploadedAt  DateTime @default(now())

  @@map("uploaded_files")
}

// USER LIBRARY
model UserBook {
  id        String   @id @default(cuid())
  userId    String
  bookId    String

  status    String
  progress  Float?
  currentPage Int?
  startedAt DateTime?
  finishedAt DateTime?

  rating    Int?
  notes     String?

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  book      Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)
  analysis  BookAnalysis?
  playlists Playlist[]
  readingSessions ReadingSession[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, bookId])
  @@index([userId, status])
  @@map("user_books")
}

// AI ANALYSIS
model BookAnalysis {
  id          String   @id @default(cuid())
  userBookId  String   @unique
  userBook    UserBook @relation(fields: [userBookId], references: [id], onDelete: Cascade)

  mood        Json
  themes      String[]
  setting     Json
  pace        String
  intensity   String
  timeOfDay   String[]

  vibe            String
  musicDescription String

  analysisSource String
  confidence     Float
  modelUsed      String
  tokensUsed     Int?
  processingTime Int?

  analyzedAt  DateTime @default(now())

  @@index([userBookId])
  @@map("book_analyses")
}

// PLAYLISTS
model Playlist {
  id          String   @id @default(cuid())
  userBookId  String
  userBook    UserBook @relation(fields: [userBookId], references: [id], onDelete: Cascade)

  name        String
  description String?
  totalDuration Int

  tracks      PlaylistTrack[]

  generationPrompt String
  generatedAt      DateTime @default(now())

  spotifyPlaylistId    String?
  appleMusicPlaylistId String?
  youtubePlaylistId    String?

  isActive    Boolean  @default(true)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userBookId])
  @@map("playlists")
}

model PlaylistTrack {
  id          String   @id @default(cuid())
  playlistId  String
  playlist    Playlist @relation(fields: [playlistId], references: [id], onDelete: Cascade)

  position    Int

  title       String
  artist      String
  album       String?
  duration    Int

  spotifyId      String?
  appleMusicId   String?
  youtubeId      String?
  isrc           String?

  genres         String[]
  isInstrumental Boolean @default(true)
  mood           String[]

  aiRationale String?

  createdAt   DateTime @default(now())

  @@unique([playlistId, position])
  @@index([playlistId])
  @@map("playlist_tracks")
}

// READING SESSIONS
model ReadingSession {
  id          String   @id @default(cuid())
  userId      String
  userBookId  String
  playlistId  String?

  startedAt   DateTime @default(now())
  endedAt     DateTime?
  duration    Int?

  startPage   Int?
  endPage     Int?
  pagesRead   Int?

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userBook    UserBook @relation(fields: [userBookId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([userBookId])
  @@map("reading_sessions")
}

// CURATED COLLECTIONS
model CuratedCollection {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  theme       String
  coverImageUrl String?

  bookIds     String[]

  sortOrder   Int      @default(0)
  isPublished Boolean  @default(true)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isPublished, sortOrder])
  @@map("curated_collections")
}
```

---

## 🔌 API Routes

### Authentication

```
POST   /api/auth/signup
POST   /api/auth/signin
POST   /api/auth/signout
GET    /api/auth/session
```

### User

```
GET    /api/user/me
PATCH  /api/user/me
GET    /api/user/preferences
PATCH  /api/user/preferences
DELETE /api/user/me
```

### Services

```
POST   /api/services/connect
GET    /api/services/callback
GET    /api/services
DELETE /api/services/{type}
POST   /api/services/sync
```

### Books

```
GET    /api/books
GET    /api/books/{id}
POST   /api/books
PATCH  /api/books/{id}
DELETE /api/books/{id}

GET    /api/books/public-domain
GET    /api/books/search
POST   /api/books/upload
```

### Library

```
GET    /api/library
POST   /api/library
GET    /api/library/{id}
PATCH  /api/library/{id}
DELETE /api/library/{id}

POST   /api/library/import/goodreads
```

### Analysis

```
POST   /api/analysis
GET    /api/analysis/{userBookId}
DELETE /api/analysis/{userBookId}
```

### Playlists

```
POST   /api/playlists
GET    /api/playlists/{id}
DELETE /api/playlists/{id}

POST   /api/playlists/{id}/export
GET    /api/playlists/{id}/tracks
POST   /api/playlists/{id}/regenerate
```

### Collections

```
GET    /api/collections
GET    /api/collections/{slug}
POST   /api/collections
PATCH  /api/collections/{id}
DELETE /api/collections/{id}
```

### Files

```
POST   /api/files/upload
GET    /api/files/{id}
DELETE /api/files/{id}
POST   /api/files/extract-text
```

---

## 🎯 Core Workflows

### Workflow 1: Generate Playlist

```typescript
// POST /api/playlists

async function generatePlaylist(req, res) {
  // 1. Validate user owns book
  const userBook = await prisma.userBook.findUnique({
    where: { id: req.body.userBookId },
    include: { book: true, analysis: true },
  });

  if (!userBook || userBook.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // 2. Generate or retrieve analysis
  let analysis = userBook.analysis;
  if (!analysis) {
    analysis = await aiService.analyzeBook(userBook.book);
    await prisma.bookAnalysis.create({
      data: { userBookId: userBook.id, ...analysis },
    });
  }

  // 3. Generate playlist using AI
  const suggestions = await aiService.generatePlaylist(
    analysis,
    req.body.preferences
  );

  // 4. Search for tracks across music services
  const tracks = await trackSearchService.findTracks(suggestions);

  // 5. Save playlist
  const playlist = await prisma.playlist.create({
    data: {
      userBookId: userBook.id,
      name: `Score for ${userBook.book.title}`,
      description: analysis.vibe,
      totalDuration: calculateDuration(tracks),
      generationPrompt: suggestions.prompt,
      tracks: {
        create: tracks.map((track, index) => ({
          position: index,
          ...track,
        })),
      },
    },
    include: { tracks: true },
  });

  return res.status(200).json(playlist);
}
```

### Workflow 2: Export to Spotify

```typescript
// POST /api/playlists/{id}/export

async function exportPlaylist(req, res) {
  const { id } = req.params;
  const { service } = req.body;

  // 1. Get playlist
  const playlist = await prisma.playlist.findUnique({
    where: { id },
    include: {
      tracks: { orderBy: { position: 'asc' } },
      userBook: { include: { user: true } },
    },
  });

  // 2. Verify ownership
  if (playlist.userBook.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // 3. Check service connection
  const connection = await prisma.connectedService.findUnique({
    where: {
      userId_serviceType: {
        userId: req.user.id,
        serviceType: service,
      },
    },
  });

  if (!connection) {
    return res.status(400).json({ error: 'Service not connected' });
  }

  // 4. Export based on service
  let externalPlaylistId;
  switch (service) {
    case 'spotify':
      externalPlaylistId = await spotifyService.createPlaylist(
        connection.accessToken,
        connection.externalUserId,
        playlist.name,
        playlist.description,
        playlist.tracks.map((t) => t.spotifyId).filter(Boolean)
      );

      await prisma.playlist.update({
        where: { id },
        data: { spotifyPlaylistId: externalPlaylistId },
      });
      break;

    case 'apple-music':
      externalPlaylistId = await appleMusicService.createPlaylist(
        connection.accessToken,
        playlist.name,
        playlist.description,
        playlist.tracks.map((t) => t.appleMusicId).filter(Boolean)
      );

      await prisma.playlist.update({
        where: { id },
        data: { appleMusicPlaylistId: externalPlaylistId },
      });
      break;

    case 'youtube':
      externalPlaylistId = await youtubeService.createPlaylist(
        connection.accessToken,
        playlist.name,
        playlist.description,
        playlist.tracks.map((t) => t.youtubeId).filter(Boolean)
      );

      await prisma.playlist.update({
        where: { id },
        data: { youtubePlaylistId: externalPlaylistId },
      });
      break;
  }

  return res.status(200).json({
    success: true,
    playlistId: externalPlaylistId,
    playlistUrl: generatePlaylistUrl(service, externalPlaylistId),
  });
}
```

---

## 🧠 AI Service Implementation

### OpenAI Integration

```typescript
// /src/lib/services/ai-service.ts

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  async analyzeBook(book: Book, fullText?: string): Promise<BookAnalysis> {
    const prompt = this.buildAnalysisPrompt(book, fullText);

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in literature and film scoring.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const analysis = JSON.parse(response.choices[0].message.content);

    return {
      ...analysis,
      analysisSource: fullText ? 'full-content' : 'metadata-only',
      modelUsed: 'gpt-4',
      tokensUsed: response.usage.total_tokens,
      confidence: fullText ? 0.9 : 0.7,
    };
  }

  async generatePlaylist(
    analysis: BookAnalysis,
    preferences: PlaylistPreferences
  ): Promise<PlaylistSuggestion> {
    const trackCount = Math.ceil(preferences.duration / 240); // ~4min per track
    const prompt = this.buildPlaylistPrompt(analysis, preferences, trackCount);

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a music curator specializing in cinematic instrumental scores for reading.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  private buildAnalysisPrompt(book: Book, fullText?: string): string {
    return `Analyze this book for creating a cinematic musical score:

Title: ${book.title}
Author: ${book.authors.join(', ')}
Genre: ${book.genres.join(', ')}
Description: ${book.description}
${fullText ? `\n\nFull Text:\n${fullText.slice(0, 10000)}` : ''}

Provide a JSON response with:
{
  "mood": [{"name": "string", "intensity": 0-1}],
  "themes": ["string"],
  "setting": {"era": "string", "location": "string", "atmosphere": "string"},
  "pace": "slow" | "moderate" | "fast",
  "intensity": "light" | "moderate" | "intense",
  "timeOfDay": ["morning", "afternoon", "evening", "night"],
  "vibe": "Short atmospheric description",
  "musicDescription": "What kind of cinematic score would fit"
}`;
  }

  private buildPlaylistPrompt(
    analysis: BookAnalysis,
    preferences: PlaylistPreferences,
    trackCount: number
  ): string {
    return `Create a cinematic instrumental playlist for reading.

Book Analysis:
- Mood: ${analysis.mood.map((m) => `${m.name} (${m.intensity})`).join(', ')}
- Themes: ${analysis.themes.join(', ')}
- Vibe: ${analysis.vibe}
- Pace: ${analysis.pace}
- Intensity: ${analysis.intensity}

Generate ${trackCount} instrumental tracks. Focus on:
- Film scores (Hans Zimmer, John Williams, Ludwig Göransson style)
- Ambient/atmospheric music
- Classical instrumental
- Modern instrumental

For each track provide:
{
  "tracks": [
    {
      "title": "Track Name",
      "artist": "Artist Name",
      "rationale": "Why this fits the book",
      "mood": ["peaceful", "contemplative"]
    }
  ]
}`;
  }
}
```

---

## 🎵 Music Service Integration

### Spotify Service

```typescript
// /src/lib/services/spotify-service.ts

export class SpotifyService {
  private async getAccessToken(refreshToken: string): Promise<string> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    return data.access_token;
  }

  async searchTracks(
    accessToken: string,
    query: string,
    limit: number = 1
  ): Promise<SpotifyTrack[]> {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data.tracks.items;
  }

  async createPlaylist(
    accessToken: string,
    userId: string,
    name: string,
    description: string,
    trackIds: string[]
  ): Promise<string> {
    // 1. Create playlist
    const createResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          public: false,
        }),
      }
    );

    const playlist = await createResponse.json();

    // 2. Add tracks (Spotify limit: 100 tracks per request)
    const chunks = this.chunkArray(trackIds, 100);
    for (const chunk of chunks) {
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: chunk.map((id) => `spotify:track:${id}`),
          }),
        }
      );
    }

    return playlist.id;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
```

### Apple Music Service

```typescript
// /src/lib/services/apple-music-service.ts

export class AppleMusicService {
  private async getDeveloperToken(): Promise<string> {
    // Apple Music uses JWT tokens signed with your private key
    const jwt = require('jsonwebtoken');

    const token = jwt.sign({}, process.env.APPLE_MUSIC_PRIVATE_KEY, {
      algorithm: 'ES256',
      expiresIn: '180d',
      issuer: process.env.APPLE_MUSIC_TEAM_ID,
      header: {
        alg: 'ES256',
        kid: process.env.APPLE_MUSIC_KEY_ID,
      },
    });

    return token;
  }

  async searchTracks(
    query: string,
    storefront: string = 'us',
    limit: number = 1
  ): Promise<AppleMusicTrack[]> {
    const developerToken = await this.getDeveloperToken();

    const response = await fetch(
      `https://api.music.apple.com/v1/catalog/${storefront}/search?term=${encodeURIComponent(
        query
      )}&types=songs&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${developerToken}`,
        },
      }
    );

    const data = await response.json();
    return data.results?.songs?.data || [];
  }

  async createPlaylist(
    userToken: string,
    name: string,
    description: string,
    trackIds: string[]
  ): Promise<string> {
    const developerToken = await this.getDeveloperToken();

    // Create playlist in user's library
    const createResponse = await fetch(
      'https://api.music.apple.com/v1/me/library/playlists',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${developerToken}`,
          'Music-User-Token': userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attributes: {
            name,
            description,
          },
          relationships: {
            tracks: {
              data: trackIds.map((id) => ({
                id,
                type: 'songs',
              })),
            },
          },
        }),
      }
    );

    const playlist = await createResponse.json();
    return playlist.data[0].id;
  }
}
```

### YouTube Music Service

```typescript
// /src/lib/services/youtube-service.ts

export class YouTubeService {
  private async refreshAccessToken(refreshToken: string): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.YOUTUBE_CLIENT_ID!,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();
    return data.access_token;
  }

  async searchVideos(
    accessToken: string,
    query: string,
    limit: number = 1
  ): Promise<YouTubeVideo[]> {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&q=${encodeURIComponent(query)}&` +
        `type=video&videoCategoryId=10&maxResults=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data.items || [];
  }

  async createPlaylist(
    accessToken: string,
    title: string,
    description: string,
    videoIds: string[]
  ): Promise<string> {
    // 1. Create playlist
    const createResponse = await fetch(
      'https://www.googleapis.com/youtube/v3/playlists?part=snippet,status',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snippet: {
            title,
            description,
          },
          status: {
            privacyStatus: 'private',
          },
        }),
      }
    );

    const playlist = await createResponse.json();
    const playlistId = playlist.id;

    // 2. Add videos to playlist
    for (const videoId of videoIds) {
      await fetch(
        'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            snippet: {
              playlistId,
              resourceId: {
                kind: 'youtube#video',
                videoId,
              },
            },
          }),
        }
      );
    }

    return playlistId;
  }

  getPlaylistUrl(playlistId: string): string {
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  }
}
```

### Helper: Generate Playlist URLs

```typescript
// /src/lib/utils/playlist-urls.ts

export function generatePlaylistUrl(
  service: 'spotify' | 'apple-music' | 'youtube',
  playlistId: string
): string {
  switch (service) {
    case 'spotify':
      return `https://open.spotify.com/playlist/${playlistId}`;

    case 'apple-music':
      return `https://music.apple.com/library/playlist/${playlistId}`;

    case 'youtube':
      return `https://www.youtube.com/playlist?list=${playlistId}`;

    default:
      throw new Error(`Unknown service: ${service}`);
  }
}
```

### Export UI Component

```typescript
// /src/components/features/playlists/export-button.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Music, Music2, Youtube } from 'lucide-react';

interface ExportButtonProps {
  playlistId: string;
  connectedServices: {
    spotify?: boolean;
    appleMusic?: boolean;
    youtube?: boolean;
  };
}

export function ExportButton({
  playlistId,
  connectedServices,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportedTo, setExportedTo] = useState<string[]>([]);

  const handleExport = async (
    service: 'spotify' | 'apple-music' | 'youtube'
  ) => {
    setIsExporting(true);

    try {
      const response = await fetch(`/api/playlists/${playlistId}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service }),
      });

      if (!response.ok) throw new Error('Export failed');

      const data = await response.json();
      setExportedTo([...exportedTo, service]);

      // Open playlist in new tab
      window.open(data.playlistUrl, '_blank');
    } catch (error) {
      console.error('Export error:', error);
      // Show error toast
    } finally {
      setIsExporting(false);
    }
  };

  const availableServices = [
    {
      id: 'spotify' as const,
      name: 'Spotify',
      icon: Music,
      connected: connectedServices.spotify,
      exported: exportedTo.includes('spotify'),
    },
    {
      id: 'apple-music' as const,
      name: 'Apple Music',
      icon: Music2,
      connected: connectedServices.appleMusic,
      exported: exportedTo.includes('apple-music'),
    },
    {
      id: 'youtube' as const,
      name: 'YouTube Music',
      icon: Youtube,
      connected: connectedServices.youtube,
      exported: exportedTo.includes('youtube'),
    },
  ].filter((service) => service.connected);

  if (availableServices.length === 0) {
    return (
      <Button variant='outline' disabled>
        Connect a music service to export
      </Button>
    );
  }

  if (availableServices.length === 1) {
    const service = availableServices[0];
    return (
      <Button
        onClick={() => handleExport(service.id)}
        disabled={isExporting || service.exported}
      >
        <service.icon className='mr-2 h-4 w-4' />
        {service.exported ? 'Exported to' : 'Export to'} {service.name}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isExporting}>Export Playlist</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {availableServices.map((service) => (
          <DropdownMenuItem
            key={service.id}
            onClick={() => handleExport(service.id)}
            disabled={service.exported}
          >
            <service.icon className='mr-2 h-4 w-4' />
            {service.exported ? '✓ Exported to' : 'Export to'} {service.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Multi-Service Track Search

When generating playlists, search across all platforms simultaneously:

```typescript
// /src/lib/services/track-search-service.ts

export class TrackSearchService {
  constructor(
    private spotifyService: SpotifyService,
    private appleMusicService: AppleMusicService,
    private youtubeService: YouTubeService
  ) {}

  async findTracks(
    suggestions: TrackSuggestion[],
    userToken?: { spotify?: string; appleMusic?: string; youtube?: string }
  ): Promise<Track[]> {
    const promises = suggestions.map((s) =>
      this.findTrackAllPlatforms(s, userToken)
    );
    const results = await Promise.allSettled(promises);

    return results
      .filter((r) => r.status === 'fulfilled' && r.value !== null)
      .map((r) => (r as PromiseFulfilledResult<Track>).value);
  }

  private async findTrackAllPlatforms(
    suggestion: TrackSuggestion,
    userToken?: { spotify?: string; appleMusic?: string; youtube?: string }
  ): Promise<Track | null> {
    const query = `${suggestion.title} ${suggestion.artist}`;

    // Search across all platforms simultaneously
    const [spotifyResults, appleMusicResults, youtubeResults] =
      await Promise.allSettled([
        userToken?.spotify
          ? this.spotifyService.searchTracks(userToken.spotify, query, 1)
          : Promise.resolve([]),
        this.appleMusicService.searchTracks(query, 'us', 1),
        userToken?.youtube
          ? this.youtubeService.searchVideos(
              userToken.youtube,
              query + ' audio',
              1
            )
          : Promise.resolve([]),
      ]);

    // Get results from each service
    const spotifyTrack =
      spotifyResults.status === 'fulfilled' ? spotifyResults.value[0] : null;
    const appleMusicTrack =
      appleMusicResults.status === 'fulfilled'
        ? appleMusicResults.value[0]
        : null;
    const youtubeVideo =
      youtubeResults.status === 'fulfilled' ? youtubeResults.value[0] : null;

    // Use Spotify as primary source (best metadata)
    if (!spotifyTrack) return null;

    return {
      title: spotifyTrack.name,
      artist: spotifyTrack.artists[0].name,
      album: spotifyTrack.album.name,
      duration: Math.floor(spotifyTrack.duration_ms / 1000),

      // Cross-platform IDs
      spotifyId: spotifyTrack.id,
      appleMusicId: appleMusicTrack?.id,
      youtubeId: youtubeVideo?.id?.videoId,
      isrc: spotifyTrack.external_ids?.isrc,

      genres: [],
      isInstrumental: true,
      mood: suggestion.mood,
      aiRationale: suggestion.rationale,
    };
  }
}
```

**Key Implementation Notes:**

1. **Spotify** - Most feature-rich API, best for primary track search
2. **Apple Music** - Requires JWT authentication with private key, playlist creation is more limited
3. **YouTube Music** - Uses YouTube Data API, search for "official audio" videos, has quota limits (10,000 units/day free)

4. **OAuth Scopes Needed:**

   - Spotify: `playlist-modify-public`, `playlist-modify-private`
   - Apple Music: MusicKit JS handles auth in browser
   - YouTube: `youtube`, `youtube.force-ssl`

5. **Rate Limits:**

   - Spotify: 180 requests/minute per user
   - Apple Music: 20 requests/second
   - YouTube: 10,000 quota units/day (search = 100 units, create playlist = 50 units)

6. **User Experience:**
   - Show which services are connected
   - Allow exporting to multiple services
   - Track which services already have the playlist
   - Provide direct links to open playlists in each app

---

## 📁 Project Structure

```
/underscore
├── /public
│   ├── /images
│   └── /fonts
│
├── /prisma
│   ├── schema.prisma
│   ├── /migrations
│   └── seed.ts
│
├── /src
│   ├── /app
│   │   ├── /(auth)
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   │
│   │   ├── /(dashboard)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── /library
│   │   │   ├── /books
│   │   │   └── /settings
│   │   │
│   │   ├── /discover
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── /api
│   │   │   ├── /auth
│   │   │   ├── /user
│   │   │   ├── /services
│   │   │   ├── /books
│   │   │   ├── /library
│   │   │   ├── /analysis
│   │   │   ├── /playlists
│   │   │   └── /collections
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── /components
│   │   ├── /ui
│   │   ├── /features
│   │   ├── /layout
│   │   └── /shared
│   │
│   ├── /lib
│   │   ├── /domain
│   │   │   └── types.ts
│   │   │
│   │   ├── /services
│   │   │   ├── ai-service.ts
│   │   │   ├── spotify-service.ts
│   │   │   ├── apple-music-service.ts
│   │   │   ├── youtube-service.ts
│   │   │   ├── google-books-service.ts
│   │   │   ├── gutenberg-service.ts
│   │   │   ├── storage-service.ts
│   │   │   └── track-search-service.ts
│   │   │
│   │   ├── /repositories
│   │   ├── /use-cases
│   │   ├── /utils
│   │   ├── /hooks
│   │   ├── prisma.ts
│   │   └── auth.ts
│   │
│   └── /config
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/underscore"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# AI (OpenAI)
OPENAI_API_KEY="sk-..."

# Spotify
SPOTIFY_CLIENT_ID="your-client-id"
SPOTIFY_CLIENT_SECRET="your-client-secret"
SPOTIFY_REDIRECT_URI="http://localhost:3000/api/services/callback/spotify"

# Apple Music
APPLE_MUSIC_KEY_ID="your-key-id"
APPLE_MUSIC_TEAM_ID="your-team-id"
APPLE_MUSIC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."

# YouTube
YOUTUBE_API_KEY="your-api-key"
YOUTUBE_CLIENT_ID="your-client-id"
YOUTUBE_CLIENT_SECRET="your-client-secret"

# Google Books (optional)
GOOGLE_BOOKS_API_KEY="your-api-key"

# Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Monitoring
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# Feature Flags
NEXT_PUBLIC_ENABLE_FILE_UPLOAD="true"
NEXT_PUBLIC_MAX_PLAYLISTS_FREE="3"
```

---

## 🚀 Development Setup

```bash
# 1. Clone repository
git clone https://github.com/your-org/underscore.git
cd underscore

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Set up database
pnpm prisma migrate dev
pnpm prisma generate

# 5. Seed database (optional)
pnpm prisma db seed

# 6. Run development server
pnpm dev

# Open http://localhost:3000
```

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "prisma db seed"
  }
}
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)

```typescript
// /src/lib/services/__tests__/ai-service.test.ts

import { describe, it, expect, vi } from 'vitest';
import { AIService } from '../ai-service';

describe('AIService', () => {
  it('should analyze book and return structured data', async () => {
    const aiService = new AIService();
    const book = {
      title: 'Test Book',
      authors: ['Author'],
      genres: ['Fiction'],
      description: 'A test book',
    };

    const analysis = await aiService.analyzeBook(book);

    expect(analysis.mood).toBeDefined();
    expect(analysis.themes).toBeInstanceOf(Array);
    expect(analysis.vibe).toBeDefined();
  });
});
```

### Integration Tests

```typescript
// /src/app/api/__tests__/playlists.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '../playlists/route';

describe('/api/playlists', () => {
  beforeEach(async () => {
    // Set up test database
  });

  it('should generate playlist for valid book', async () => {
    const request = new Request('http://localhost:3000/api/playlists', {
      method: 'POST',
      body: JSON.stringify({
        userBookId: 'test-id',
        preferences: { instrumentalOnly: true, duration: 3600 },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.tracks).toBeDefined();
    expect(data.tracks.length).toBeGreaterThan(0);
  });
});
```

### E2E Tests (Playwright)

```typescript
// /tests/e2e/playlist-generation.spec.ts

import { test, expect } from '@playwright/test';

test('user can generate playlist for book', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Navigate to book
  await page.goto('/discover');
  await page.click('text=Pride and Prejudice');

  // Generate playlist
  await page.click('button:has-text("Generate Playlist")');

  // Wait for generation
  await page.waitForSelector('text=Your playlist is ready', { timeout: 30000 });

  // Verify tracks
  const tracks = await page.locator('[data-testid="track-item"]').count();
  expect(tracks).toBeGreaterThan(0);
});
```

---

## 📈 Performance Optimization

### Database Optimization

- Index frequently queried fields
- Use database connection pooling
- Implement pagination for lists
- Cache frequently accessed data

### API Optimization

- Implement rate limiting
- Use Redis for session storage
- Cache AI responses
- Optimize N+1 queries

### Frontend Optimization

- Code splitting (automatic with Next.js)
- Image optimization (next/image)
- Lazy load components
- Minimize bundle size

---

## 🔒 Security Considerations

- Validate all user inputs (Zod)
- Sanitize file uploads
- Rate limit API endpoints
- Encrypt sensitive tokens
- Use HTTPS everywhere
- Implement CSRF protection
- Sanitize user-generated content
- Regular security audits

---

## 📊 Monitoring & Logging

### Monitoring

- Vercel Analytics (web vitals)
- Sentry (error tracking)
- Custom metrics for:
  - Playlist generation success rate
  - API response times
  - AI token usage
  - User engagement

### Logging

```typescript
// /src/lib/logger.ts

export const logger = {
  info: (message: string, meta?: object) => {
    console.log(JSON.stringify({ level: 'info', message, ...meta }));
  },
  error: (message: string, error?: Error, meta?: object) => {
    console.error(
      JSON.stringify({
        level: 'error',
        message,
        error: error?.message,
        stack: error?.stack,
        ...meta,
      })
    );
  },
};
```

---

## 🚢 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Setup

1. Add environment variables in Vercel dashboard
2. Connect database (Supabase/Railway)
3. Set up domain
4. Configure analytics

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📝 Documentation

### Code Documentation

- JSDoc comments for complex functions
- README for each major module
- API documentation (consider Swagger/OpenAPI)

### Developer Onboarding

- Setup guide (README.md)
- Architecture overview
- Contribution guidelines
- Code style guide

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Status:** Ready for Development

**Let's build Underscore.** 🚀
