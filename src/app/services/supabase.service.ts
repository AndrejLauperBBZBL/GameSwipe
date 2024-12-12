import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LoadingController } from "@ionic/angular";
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor( private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  createLoader(){
    return this.loadingCtrl.create()
  }

  async saveGamesToSupabase(games: Game[]): Promise<void> {
    try {
      const supabase = this.supabase; // Get the Supabase client
  
      // Validate data: Filter out invalid games
      const validGames = games.filter(game => game.id && game.title && game.image_url);
      if (validGames.length === 0) {
        console.warn('No valid games to insert.');
        return;
      }
  
      const existingGamesResponse = await supabase
        .from('games')
        .select('id')
        .in('id', validGames.map(game => game.id));
  
      const existingGameIds = existingGamesResponse.data?.map((game: { id: number }) => game.id) || [];
  
      // Filter out games that already exist in the database
      const newGames = validGames.filter(game => !existingGameIds.includes(game.id));
  
      if (newGames.length > 0) {
        // Insert new games into the database
        const { error } = await supabase.from('games').insert(newGames);
        if (error) throw error;
  
        console.log(`${newGames.length} new games saved to the database.`);
      } else {
        console.log('No new games to save.');
      }
    } catch (error) {
      console.error('Error inserting games:', error);
    }
  }
  
   async createUser(username: string): Promise<User | null> {
     const { data, error } = await this.supabase
       .from('users')
       .insert([{ username }])
       .select()
       .single();
     if (error) throw error;
     return data;
   }
   async saveGamePreference(userId: string, gameId: number, interested: boolean) {
     const { error } = await this.supabase
       .from('game_preferences')
       .insert([{
         user_id: userId,
         game_id: gameId,
         interested
       }]);
     if (error) throw error;
   }
   async getInterestedGames(userId: string): Promise<Game[]> {
     const { data, error } = await this.supabase
       .from('game_preferences')
       .select('games(*)')
       .eq('user_id', userId)
       .eq('interested', true)
       .eq('status', 'active');
     if (error) throw error;
     return data.map((item: { games: any; }) => item.games);
   }
   async updateGameStatus(userId: string, gameId: number, status: 'played' | 'not_interested') {
     const { error } = await this.supabase
       .from('game_preferences')
       .update({ status })
       .match({ user_id: userId, game_id: gameId });
     if (error) throw error;
   }
   async getUserByUsername(username: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
  
    if (error) {
      if (error.code === 'PGRST116') {
        // No matching rows
        return null;
      }
      throw error;
    }
    return data;
  }
  async uploadProfilePicture(userId: string, dataUrl: string): Promise<void> {
    const { data, error } = await this.supabase.storage
      .from('profile-pictures')
      .upload(`user-${userId}.png`, this.dataURLtoBlob(dataUrl), {
        contentType: 'image/png'
      });
  
    if (error) {
      throw error;
    }
  
    console.log('Picture uploaded:', data);
  }
  
  private dataURLtoBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
  
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error('Invalid data URL format');
    }
  
    const mime = mimeMatch[1]; 
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  
  
  
}