import { Component, OnInit } from '@angular/core';
import { IonMenuButton, IonIcon, IonLabel, IonMenu, IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonItem, IonToggle } from '@ionic/angular/standalone'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonToggle, IonItem, IonButton, IonIcon, IonLabel, IonMenuButton, IonMenu, IonHeader, IonToolbar, IonContent, IonTitle, IonButtons ]
})
export class MenuComponent implements OnInit  {

  paletteToggle = false;



  constructor() {

   }
   
   ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
   }

   initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev: CustomEvent) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

}
