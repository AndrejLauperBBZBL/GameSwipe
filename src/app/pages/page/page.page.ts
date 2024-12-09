import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { fastFoodOutline, camera, batteryHalfOutline, cogOutline } from 'ionicons/icons';
import { IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PagePage {

  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({cogOutline,batteryHalfOutline,camera,fastFoodOutline});
  }
}
