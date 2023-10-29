import { Component } from '@angular/core';
import { Difficulty, StateService } from '../state.service';
import { Riddle, gameUtils } from '../gameUtils';
import { SoundService } from '../sound.service';

@Component({
  selector: 'app-game2',
  template: `
    <div class="correctAnswer">
      {{ riddle.answer }}
    </div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of riddle.options">
        <ng-container  *ngIf="option === riddle.answer; then thenBlock else elseBlock"/>
        <ng-template #thenBlock>
          <span (click)="announceWin()"><app-dice [n]="option" [size]=150></app-dice></span>
        </ng-template>  
        <ng-template #elseBlock>
          <span (click)="soundService.playError()"><app-dice [n]="option" [size]=150></app-dice></span>
        </ng-template>  
      </ng-container>
    </div>
  `,
  styles: ['.excersizeContainer { display: flex; flex-wrap: wrap; width: 350px; gap: 0 20px; justify-content: center; }']
})
export class Game2Component {
  riddle!: Riddle<number>;
  private currentDifficulty!: Difficulty;
  constructor(public stateService: StateService, public soundService: SoundService) {
    stateService.getDifficulty().subscribe(difficculty => {
      this.currentDifficulty = difficculty;
      this.riddle = this.getNewRiddle(difficculty); 
    });
  }

  getNewRiddle(difficulty: Difficulty): Riddle<number> {
    switch (difficulty) {
      case 'Easy': return gameUtils.getNumberRiddle(10, 4);
      case 'Hard': return gameUtils.getNumberRiddleInRange(25, 7, 4);
      default: throw new Error('unknown Difficulty value: ' + difficulty);
    }  
  }
  announceWin() {
    this.soundService.playFanfare();
    this.riddle = this.getNewRiddle(this.currentDifficulty);
  }
}
