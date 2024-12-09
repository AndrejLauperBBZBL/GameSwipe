import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';

  constructor(private http: HttpClient) {}

//   getNewGames(): Observable<Game[]> {
//     // Replace with your actual API implementation
//     return this.http.get<Game[]>(`${this.apiUrl}/new-releases`);
//   }
}