import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import {
  RootComponent,
  SellComponent,
  SellEditComponent,
  SellFABComponent,
  SellNewComponent,
  TwitterComponent,
  InviteComponent,
  SummaryComponent
} from './components';
import { CopyStoreService } from './services/copy.store.service';

@NgModule({
  declarations: [
    RootComponent,
    SellComponent,
    SellEditComponent,
    SellFABComponent,
    SellNewComponent,
    TwitterComponent,
    InviteComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CopyStoreService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
