import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../models/game.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = '0e207144b80a456d9b1138d2eea5e4e0';

  constructor(private http: HttpClient, private supabaseService: SupabaseService) {}

  /**
   * Fetch new games from the RAWG API.
   */
  getNewGames(): Observable<Game[]> {
    return this.http.get<any>(`${this.apiUrl}?key=${this.apiKey}`)
  .pipe(
    map(response => response.results.map((game: any) => ({
      id: game.id,
      title: game.name,
      genre: game.genres.map((g: any) => g.name).join(', '),
      created_at: game.released, 
      release_date: game.released, 
      image_url: game.background_image,
      price: game.metacritic ? `$${(game.metacritic / 10 * 6).toFixed(2)}` : 'N/A'
    }))),

    map(games => {
      this.supabaseService.saveGamesToSupabase(games);
      return games;
    })
  );

  }

  /**
   * Save a user's game preference to the database.
   * @param userId User's ID
   * @param game Game object
   * @param interested Boolean indicating user interest
   */
  async saveGamePreference(userId: string, game: Game, interested: boolean): Promise<void> {
    await this.supabaseService.saveGamePreference(userId, game.id, interested);
  }

  /**
   * Get all games a user is interested in.
   * @param userId User's ID
   */
  async getInterestedGames(userId: string): Promise<Game[]> {
    return await this.supabaseService.getInterestedGames(userId);
  }

  /**
   * Update the status of a user's game.
   * @param userId User's ID
   * @param gameId Game's ID
   * @param status New status ('played' or 'not_interested')
   */
  async updateGameStatus(userId: string, gameId: number, status: 'played' | 'not_interested'): Promise<void> {
    await this.supabaseService.updateGameStatus(userId, gameId, status);
  }
}
