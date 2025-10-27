// books
export type BookSource =
  | 'goodreads'
  | 'kindle'
  | 'manual'
  | 'uploaded'
  | 'google-books'
  | 'apple-books';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  coverImageUrl?: string;
  genres: string[];
  // source tracking
  source: BookSource;
  externalId?: string;
  // metadata
  createdAt: Date;
  updatedAt: Date;
}
