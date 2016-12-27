import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SellComponent } from './sell/sell.component';
import { TwitterComponent } from './twitter/twitter.component';
import { InviteComponent } from './invite/invite.component';

@NgModule({
  declarations: [
    AppComponent,
    SellComponent,
    TwitterComponent,
    InviteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
