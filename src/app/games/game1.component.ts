import { Component } from '@angular/core';
import { Game } from '../game';
import { StateService } from '../state.service';

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
  styles: ['.correctAnswer { margin-top: 40px; }']
})

export class Game1Component extends Game {
  stateService: StateService;
  constructor(stateService: StateService) {
    super();
    this.stateService = stateService;
    this.newGame();
  }
  override getMax(): number {
    const difficulty = this.stateService.getDifficulty();
    switch (difficulty) {
      case 'Easy': return 10;
      case 'Hard': return 25;
      default: throw new Error('unknown Difficulty value: ' + difficulty);
    }
  }
  override getNumberOfOptions(): number {
    return 3;
  }  
}
