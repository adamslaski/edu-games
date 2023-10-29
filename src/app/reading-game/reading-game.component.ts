import { Component } from '@angular/core';

import { Idea, groupedIdeas, ideas } from './ideas';
import { StateService } from '../state.service';
import { Riddle, gameUtils } from '../gameUtils';
import { SoundService } from '../sound.service';

@Component({
  selector: 'app-game1',
  template: `
    <div class="correctAnswer">{{riddle.answer.word}}</div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of riddle.options">
        <ng-container  *ngIf="option.word === riddle.answer.word; then thenBlock else elseBlock"/>
        <ng-template #thenBlock>
          <span (click)="announceWin()">    
            <img [src]="option.url">
          </span>
        </ng-template>  
        <ng-template #elseBlock>
          <span (click)="soundService.playError()">
            <img [src]="option.url">
          </span>
        </ng-template>  
      </ng-container>
    </div>
    `,
  styles: [
    `.excersizeContainer { 
        display: flex; 
        flex-wrap: wrap; 
        width: 80%; 
        gap: 0 20px; 
        justify-content: center; 
      }`,
    `@media screen and (max-width: 700px) {
      .correctAnswer { margin-top: 0px;   font-size: 70px;}
      span > img { width: 150px;height: 150px; }
    }
    @media screen and (min-width: 700px) {
      .correctAnswer { margin-top: 40px; }
      span > img { width: 200px; height: 200px; }
    }
    `
  ]

})
export class ReadingGameComponent {
  riddle: Riddle<Idea>;
  constructor(public stateService: StateService, public soundService: SoundService) {
    this.riddle = this.getNewRiddle();
  }

  getNewRiddle(): Riddle<Idea> {
    const difficulty = this.stateService.getDifficulty();
    switch (difficulty) {
      case 'Easy': 
        return gameUtils.getRiddle(ideas, 3);
      case 'Hard':
        const arr = groupedIdeas[Math.floor(Math.random() * groupedIdeas.length)];
        return gameUtils.getRiddle(arr, 3);

      default:
        throw new Error('Value unknown: ' + this.stateService.getDifficulty());
    }
  }

  announceWin() {
    this.soundService.playFanfare();
    this.riddle = this.getNewRiddle();
  }
}
