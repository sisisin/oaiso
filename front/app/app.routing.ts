import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellComponent } from './sell/sell.component';

const appRoutes: Routes = [
  {
    path: 'sell',
    component: SellComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
