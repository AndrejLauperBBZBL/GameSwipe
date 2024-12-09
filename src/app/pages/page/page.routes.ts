import { Routes } from '@angular/router';
import { PagePage } from './page.page';

export const routes: Routes = [
  {
    path: 'pages',
    component: PagePage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'interested',
        loadComponent: () =>
          import('../interested/interested.page').then((m) => m.InterestedPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full',
  },
];
