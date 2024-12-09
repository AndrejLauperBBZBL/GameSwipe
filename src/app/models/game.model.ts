export interface Game {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    releaseDate: string;
    price: number;
    status?: 'active' | 'played' | 'not_interested';
  }