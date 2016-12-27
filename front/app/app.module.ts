import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import {
  SellComponent,
  SellEditComponent,
  SellFABComponent,
  TwitterComponent,
  InviteComponent,
  SummaryComponent
} from './components';
import { CopyStoreService } from './services/copy.store.service';

@NgModule({
  declarations: [
    AppComponent,
    SellComponent,
    SellEditComponent,
    SellFABComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
