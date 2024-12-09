import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
     this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
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
}