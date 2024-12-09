import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/page/page.routes').then((m) => m.routes),
  }
];
