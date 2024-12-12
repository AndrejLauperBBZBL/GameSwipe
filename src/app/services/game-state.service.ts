// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Game } from '../models/game.model';
// import { MOCK_GAMES } from '../data/mock-games';

// @Injectable({
//   providedIn: 'root'
// })
// export class GameStateService {
//   private gamesSubject = new BehaviorSubject<Game[]>(MOCK_GAMES);
//   private interestedGamesSubject = new BehaviorSubject<Game[]>([]);

//   getGames(): Observable<Game[]> {
//     return this.gamesSubject.asObservable();
//   }

//   getInterestedGames(): Observable<Game[]> {
//     return this.interestedGamesSubject.asObservable();
//   }

//   addToInterested(game: Game) {
//     const currentGames = this.interestedGamesSubject.value;
//     this.interestedGamesSubject.next([...currentGames, { ...game, status: 'active' }]);
//   }

//   updateGameStatus(gameId: number, status: 'played' | 'not_interested') {
//     const currentGames = this.interestedGamesSubject.value;
//     const updatedGames = currentGames.filter(game => game.id !== gameId);
//     this.interestedGamesSubject.next(updatedGames);
//   }
// }