import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
    BrowserModule,
    RouterModule.forRoot([
      {path: 'game1', component: Game1Component},
      {path: 'game2', component: Game2Component},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
