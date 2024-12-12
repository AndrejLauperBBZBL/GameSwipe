import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SupabaseService } from '../../services/supabase.service';
import { UserStateService } from '../../services/user-state.service';
import {
  IonCard,
  IonInput,
  IonLabel,
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButton,
  IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonContent,
    IonTitle,
    IonHeader,
    IonCard,
    IonToolbar,
    IonImg
  ]
})
export class ProfilePage {
  username = '';
  profilePicture: string | undefined;

  constructor(
    private supabaseService: SupabaseService,
    private userStateService: UserStateService
  ) {}

  async register() {
    if (!this.username.trim()) {
      console.error('Username is required.');
      return;
    }

    try {
      const user = await this.supabaseService.createUser(this.username);
      if (user) {
        this.userStateService.setUserId(user.id); // Set userId globally
        console.log('Account registered successfully:', user);
      }
    } catch (error) {
      console.error('Error registering account:', error);
    }
  }

  async login() {
    if (!this.username.trim()) {
      console.error('Username is required.');
      return;
    }

    try {
      const user = await this.supabaseService.getUserByUsername(this.username);
      if (user) {
        this.userStateService.setUserId(user.id); // Set userId globally
        console.log('Login successful:', user);
      } else {
        console.error('No user found with the provided username.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  onInput(event: any) {
    this.username = event.target.value; // Capture input value
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
  
      if (image.dataUrl) {
        this.profilePicture = image.dataUrl;
  
        // Optionally, upload the image to your database
        const userId = this.userStateService.getUserId();
        if (userId) {
          await this.supabaseService.uploadProfilePicture(userId, image.dataUrl);
          console.log('Profile picture uploaded successfully.');
        }
      } else {
        console.error('Error: dataUrl is undefined.');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }
  
}
