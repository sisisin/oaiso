import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SellComponent,
  SellEditComponent,
  TwitterComponent,
  InviteComponent,
} from './components';

const appRoutes: Routes = [
  { path: '', redirectTo: 'sell', pathMatch: 'full' },
  { path: 'sell', component: SellComponent },
  { path: 'sell/edit', component: SellEditComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: 'invite', component: InviteComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
