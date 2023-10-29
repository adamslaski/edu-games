import { Component } from '@angular/core';
import { Difficulty, StateService } from '../state.service';
import { Riddle, gameUtils } from '../gameUtils';
import { SoundService } from '../sound.service';

type SumRiddle = Riddle<number> & { a: number; b:number };

@Component({
  selector: 'app-sum-game',
  template: `
    <div class="correctAnswer" style="display: flex; justify-content: center; align-items: center; gap: 10vmin">
      <span style="display: block;">
        <div>{{ riddle.a }}</div>
        <div><app-dice [n]="riddle.a" [size]=100></app-dice></div>
      </span>
      <span>+</span>
      <span style="display: block;">
        <div>{{ riddle.b }}</div>
        <div><app-dice [n]="riddle.b" [size]=100></app-dice></div>
      </span>
    </div>
    <div style="text-align: center; font-size: 20vmin;">=</div>
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
  styles: [
    '.excersizeContainer { display: flex; flex-wrap: wrap; width: 80%; gap: 10vmin; justify-content: center; }',
    '.correctAnswer { font-size: 20vmin; }']
})
export class SumGameComponent {
  riddle!: SumRiddle;
  private currentDifficulty!: Difficulty;
  constructor(public stateService: StateService, public soundService: SoundService) {
    stateService.getDifficulty().subscribe(difficculty => {
      this.currentDifficulty = difficculty;
      this.riddle = this.getNewRiddle(difficculty); 
    });
  }

  getNewRiddle(difficulty: Difficulty): SumRiddle {
    switch (difficulty) {
      case 'Easy': { 
        const riddle = gameUtils.getNumberRiddleInRange(2, 10, 5, 3);
        const a = gameUtils.randomIntFromInclusiveRange(1, riddle.answer - 1);
        const b = riddle.answer - a;
        return {...riddle, a, b};
      }
      case 'Hard': { 
        const riddle = gameUtils.getNumberRiddleInRange(2, 25, 5, 3);
        const a = gameUtils.randomIntFromInclusiveRange(1, riddle.answer - 1);
        const b = riddle.answer - a;
        return {...riddle, a, b};
      }
      default: throw new Error('unknown Difficulty value: ' + difficulty);
    }  
  }
  announceWin() {
    this.soundService.playFanfare();
    this.riddle = this.getNewRiddle(this.currentDifficulty);
  }
}
