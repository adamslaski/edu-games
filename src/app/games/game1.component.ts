import { Component } from '@angular/core';
import { Difficulty, StateService } from '../state.service';
import { SoundService } from '../sound.service';
import { Riddle, gameUtils } from '../gameUtils';

@Component({
  selector: 'app-game1',
  template: `
    <div class="correctAnswer">
      <app-dice [n]="riddle.answer" [size]=200></app-dice>
    </div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of riddle.options">
        <ng-container  *ngIf="option === riddle.answer; then thenBlock else elseBlock"/>
        <ng-template #thenBlock>
          <span (click)="announceWin()">{{ option }}</span>
        </ng-template>  
        <ng-template #elseBlock>
          <span (click)="soundService.playError()">{{ option }}</span>
        </ng-template>  
      </ng-container>
    </div>
    `,
  styles: ['.correctAnswer { margin-top: 40px; }']
})
export class Game1Component {
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
      case 'Easy': return gameUtils.getNumberRiddle(10, 3);
      case 'Hard': return gameUtils.getNumberRiddleInRange(25, 7, 3);
      default: throw new Error('unknown Difficulty value: ' + difficulty);
    }  
  }
  announceWin() {
    this.soundService.playFanfare();
    this.riddle = this.getNewRiddle(this.currentDifficulty);
  }
}
