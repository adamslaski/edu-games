import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiceComponent } from './dice/dice.component';
import { Game1Component } from './games/game1.component';
import { Game2Component } from './games/game2.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceComponent,
    Game1Component,
    Game2Component,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
