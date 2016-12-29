import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import {
  RootComponent,
  SellComponent,
  SellCopyDisplayComponent,
  SellEditComponent,
  SellFABComponent,
  SellNewComponent,
  TwitterComponent,
  InviteComponent,
  SummaryComponent,
  CircleComponent,
} from './components';
import {
  CircleService,
  CircleStoreService,
  CopyStoreService,
  CopyEditStoreService,
  CopyService,
  SellStoreService,
  SellService,
} from './services/';

@NgModule({
  declarations: [
    RootComponent,
    SellComponent,
    SellCopyDisplayComponent,
    SellEditComponent,
    SellFABComponent,
    SellNewComponent,
    TwitterComponent,
    InviteComponent,
    SummaryComponent,
    CircleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [
    CircleService,
    CircleStoreService,
    CopyStoreService,
    CopyEditStoreService,
    CopyService,
    SellStoreService,
    SellService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
