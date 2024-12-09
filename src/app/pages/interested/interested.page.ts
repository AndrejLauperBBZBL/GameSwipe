import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Game } from '../../models/game.model';
import { IonCard, IonButton, IonRow, IonGrid, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonContent, IonTitle, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-interested',
  templateUrl: './interested.page.html',
  styleUrls: ['./interested.page.scss'],
  standalone: true,
  imports: [IonCol, CommonModule, IonButton, IonRow, IonGrid, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonContent, IonTitle]
})
export class InterestedPage implements OnInit {
  interestedGames: Game[] = [];

  constructor(private gameStateService: GameStateService) {}

  ngOnInit() {
    this.loadInterestedGames();
  }

  loadInterestedGames() {
    this.gameStateService.getInterestedGames().subscribe(games => {
      this.interestedGames = games;
    });
  }

  updateGameStatus(gameId: number, status: 'played' | 'not_interested') {
    this.gameStateService.updateGameStatus(gameId, status);
  }
}