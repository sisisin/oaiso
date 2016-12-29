import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SellComponent,
  SellEditComponent,
  TwitterComponent,
  InviteComponent,
  CircleComponent,
} from './components';

const appRoutes: Routes = [
  { path: '', redirectTo: 'sell', pathMatch: 'full' },
  { path: 'sell', component: SellComponent },
  { path: 'sell/edit', component: SellEditComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'circle', component: CircleComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
