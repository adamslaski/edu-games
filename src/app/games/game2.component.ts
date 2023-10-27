import { Component } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-game2',
  template: `
    <div class="correctAnswer">
      {{ answer }}
    </div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of options">
        <ng-container  *ngIf="option === answer; then thenBlock else elseBlock"/>
        <ng-template #thenBlock>
          <span (click)="playFanfare()"><app-dice [n]="option" [size]=150></app-dice></span>
        </ng-template>  
        <ng-template #elseBlock>
          <span (click)="playError()"><app-dice [n]="option" [size]=150></app-dice></span>
        </ng-template>  
      </ng-container>
    </div>
  `,
  styles: ['.excersizeContainer { display: flex; flex-wrap: wrap; width: 350px; gap: 0 20px; justify-content: center; }']
})
export class Game2Component extends Game {
  constructor() {
    super(4);
  }
}
