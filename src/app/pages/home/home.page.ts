import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { SupabaseService } from '../../services/supabase.service';
import { Game } from '../../models/game.model';
import { IonCard, IonThumbnail, IonItemOption, IonIcon, IonItemDivider, IonItemSliding, IonItem, IonList, IonItemGroup, IonLabel, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonContent, IonTitle, IonBadge, IonItemOptions } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { GameStateService } from 'src/app/services/game-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItemOptions, IonThumbnail, IonItemOption, IonIcon, IonItemDivider, IonItemSliding, IonItem, IonList, IonItemGroup, IonLabel, IonBadge, IonTitle, CommonModule, IonCardSubtitle, IonCardContent, IonToolbar, IonHeader, IonCard, IonCardHeader, IonCardTitle, IonContent]
})
export class HomePage implements OnInit {
  games: Game[] = [];
  currentGame: Game | null = null;
  currentIndex = 0;
  games$: Observable<Game[]> | undefined;
  interestedGames$: Observable<Game[]> | undefined;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit() {
    this.loadGames();
    this.games$ = this.gameStateService.getGames();
    this.interestedGames$ = this.gameStateService.getInterestedGames();
  }

  loadGames() {
    this.gameStateService.getGames().subscribe(games => {
      this.games = games;
        this.currentGame = this.games[0]; 
    });
  }

  onSwipe(event: any) {
    if (!this.currentGame) return;

    if (event.direction === 2) { // left swipe
      this.gameStateService.addToInterested(this.currentGame);
    }
    
    this.currentIndex++;
    this.currentGame = this.games[this.currentIndex] || null;
  }

  addToInterested(game: Game) {
    this.gameStateService.addToInterested(game);
  }

  updateGameStatus(gameId: number, status: 'played' | 'not_interested') {
    this.gameStateService.updateGameStatus(gameId, status);
  }
}