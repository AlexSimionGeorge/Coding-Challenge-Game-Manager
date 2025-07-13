import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    loadComponent: () =>
      import('./games/games').then(m => m.Games),
  },
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
];
