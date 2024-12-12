import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';
import {
  IonCard, IonMenuButton, IonThumbnail, IonItemOption, IonIcon,
  IonItemDivider, IonItemSliding, IonItem, IonList, IonItemGroup, IonLabel,
  IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonHeader,
  IonToolbar, IonContent, IonTitle, IonBadge, IonItemOptions
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonItemOptions, MenuComponent, IonMenuButton, IonThumbnail, IonItemOption,
    IonIcon, IonItemDivider, IonItemSliding, IonItem, IonList, IonItemGroup,
    IonLabel, IonBadge, IonTitle, CommonModule, IonCardSubtitle,
    IonCardContent, IonToolbar, IonHeader, IonCard, IonCardHeader,
    IonCardTitle, IonContent
  ]
})
export class HomePage implements OnInit {
  games: Game[] = [];
  currentGame: Game | null = null;
  currentIndex = 0;

  // Observables for games and interested games
  games$: Observable<Game[]> | undefined;
  interestedGames$: Observable<Game[]> | undefined;

  // Replace with actual user ID from authentication
  userId: string

  constructor(private gameService: GameService, private userState: UserStateService) {
    this.userId = userState.getUserId() ?? ''
  }

  ngOnInit() {
    this.loadGames();
    this.interestedGames$ = this.fetchInterestedGames();
  }

  // Fetch and load new games
  loadGames() {
    this.gameService.getNewGames().subscribe(games => {
      this.games = games;
      console.log(games)
      this.currentGame = this.games[0];
    });
  }

  // Fetch interested games
  fetchInterestedGames(): Observable<Game[]> {
    return new Observable((observer) => {
      this.gameService.getInterestedGames(this.userId).then((games) => {
        observer.next(games);
        observer.complete();
      }).catch((error) => {
        console.error('Failed to fetch interested games:', error);
        observer.error(error);
      });
    });
  }

  // Handle swipe events to add games to interested list
  async onSwipe(event: any) {
    if (!this.currentGame) return;

    if (event.direction === 2) { // Left swipe: Add to interested
      await this.gameService.saveGamePreference(this.userId, this.currentGame, true);
      console.log(`${this.currentGame.title} added to interested.`);
    }

    // Move to the next game
    this.currentIndex++;
    this.currentGame = this.games[this.currentIndex] || null;
  }

  // Manually add a game to the interested list
  async addToInterested(game: Game) {
    await this.gameService.saveGamePreference(this.userId, game, true);
    console.log(`${game.title} added to interested.`);
  }

  // Update the game status (e.g., played or not interested)
  async updateGameStatus(gameId: number, status: 'played' | 'not_interested') {
    await this.gameService.updateGameStatus(this.userId, gameId, status);
    console.log(`Game ${gameId} status updated to ${status}.`);
  }
}
