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
  SummaryComponent
} from './components';
import {
  CopyStoreService,
  CopyEditStoreService,
  CopyService
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
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CopyStoreService,
    CopyEditStoreService,
    CopyService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
