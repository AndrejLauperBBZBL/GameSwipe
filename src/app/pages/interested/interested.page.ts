import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import {
  IonCard ,IonButton, IonRow, IonGrid, IonCardSubtitle, IonCardContent,
  IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonContent, IonTitle, IonCol, IonItemDivider, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { GameService } from 'src/app/services/game.service'; 
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-interested',
  templateUrl: './interested.page.html',
  styleUrls: ['./interested.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItemDivider, 
    IonCol, CommonModule, MenuComponent, IonButton, IonRow, IonGrid, IonCard, IonCardContent,
    IonCardSubtitle, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonContent, IonTitle
  ]
})
export class InterestedPage implements OnInit {
  interestedGames: Game[] = [];

  // Replace with the actual user ID from authentication
  userId: string

  constructor(private gameService: GameService, private userState: UserStateService) {
    this.userId = userState.getUserId() ?? ''
  }

  ngOnInit() {
    this.loadInterestedGames();
  }

  async loadInterestedGames() {
    try {
      const games = await this.gameService.getInterestedGames(this.userId);
      this.interestedGames = games;
    } catch (error) {
      console.error('Failed to load interested games:', error);
    }
  }

  async updateGameStatus(gameId: number, status: 'played' | 'not_interested') {
    try {
      await this.gameService.updateGameStatus(this.userId, gameId, status);
      console.log(`Game ${gameId} status updated to ${status}.`);
      // Remove the game from the list after updating its status
      this.interestedGames = this.interestedGames.filter(game => game.id !== gameId);
    } catch (error) {
      console.error('Failed to update game status:', error);
    }
  }
}
