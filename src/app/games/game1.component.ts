import { Component } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-game1',
  template: `
    <div class="correctAnswer">
      <app-dice [n]="answer" [size]=200></app-dice>
    </div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of options">
        <ng-container  *ngIf="option === answer; then thenBlock else elseBlock"/>
        <ng-template #thenBlock>
          <span (click)="playFanfare()">{{ option }}</span>
        </ng-template>  
        <ng-template #elseBlock>
          <span (click)="playError()">{{ option }}</span>
        </ng-template>  
      </ng-container>
    </div>
    `,
})

export class Game1Component extends Game {
  constructor() {
    super(3);
  }
}
