import { Component } from '@angular/core';
import { Game } from '../game';
import { StateService } from '../state.service';

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
  stateService: StateService;
  constructor(stateService: StateService) {
    super();
    this.stateService = stateService;
    this.newGame();
  }
  
  override getMax(): number {
    const difficulty = this.stateService.getDifficulty();
    switch (this.stateService.getDifficulty()) {
      case 'Easy': return 10;
      case 'Hard': return 25;
      default: throw new Error('unknown Difficulty value: ' + difficulty);
    }
  }
  override getNumberOfOptions(): number {
    return 4;
  }
}
