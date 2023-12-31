import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule}  from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { DiceComponent } from './dice/dice.component';
import { Game1Component } from './games/game1.component';
import { Game2Component } from './games/game2.component';
import { ReadingGameComponent } from './reading-game/reading-game.component';
import { SumGameComponent } from './games/sum-game.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceComponent,
    Game1Component,
    Game2Component,
    ReadingGameComponent,
    SumGameComponent,
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule,
    MatButtonToggleModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: 'game1', component: Game1Component},
      {path: 'game2', component: Game2Component},
      {path: 'reading', component: ReadingGameComponent},
      {path: 'sum', component: SumGameComponent},
      {path: '**', redirectTo: 'game1'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
