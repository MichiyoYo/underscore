//libeary = the list of the user's books
import { BookAnalysis } from './analysis.types';
import { Book } from './book.types';
import { Playlist } from './playlist.types';
import { User } from './user.types';

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

export interface UserBookWithRelations extends UserBook {
  user: User;
  book: Book;
  analysis?: BookAnalysis;
  playlists: Playlist[];
}
