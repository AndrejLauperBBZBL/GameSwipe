import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import {IonCard, IonInput, IonLabel, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonTitle, IonHeader, IonToolbar, IonButton } from '@ionic/angular/standalone'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonTitle, IonHeader, IonCard, IonToolbar]
})
export class ProfilePage {
  username = '';

  constructor(private supabaseService: SupabaseService) {}

  async createAccount() {
    try {
      const user = await this.supabaseService.createUser(this.username);
      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  }
}