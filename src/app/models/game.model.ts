export interface Game {
    id: number;
    title: string;
    genre: string;
    created_at: string;
    release_date: string;
    image_url: string;
    price: string;
    status?: 'active' | 'played' | 'not_interested';
  }