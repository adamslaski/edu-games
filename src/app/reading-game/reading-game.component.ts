import { Component } from '@angular/core';

import { Idea, groupedIdeas, ideas } from './ideas';
import { Game, shuffle } from '../game';
import { StateService } from '../state.service';

@Component({
  selector: 'app-game1',
  template: `
    <div class="correctAnswer">{{answerIdea.word}}</div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of optionsIdea">
        <ng-container  *ngIf="option.word === answerIdea.word; then thenBlock else elseBlock"/>
        <ng-template #thenBlock>
          <span (click)="playFanfare()">    
            <img [src]="option.url">
          </span>
        </ng-template>  
        <ng-template #elseBlock>
          <span (click)="playError()">
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
export class ReadingGameComponent extends Game {
  stateService: StateService;
  ideas = ideas;
  optionsIdea!: Idea[];
  answerIdea!: Idea;
  constructor(stateService: StateService) {
    super();
    this.stateService = stateService;
    this.newGame();
  }
  override newGame(): void {
    switch (this.stateService.getDifficulty()) {
      case 'Easy': 
      console.log('easy');
        this.optionsIdea = shuffle(Array.from(ideas.keys())).slice(0, 3).map(x => ideas[x]);
        this.answerIdea = this.optionsIdea[Math.floor(Math.random() * this.optionsIdea.length)];
        break;
      case 'Hard':
        console.log('hsrd');
        const arr = groupedIdeas[Math.floor(Math.random() * groupedIdeas.length)];
        console.log('hsrd', arr);

        this.optionsIdea = shuffle(Array.from(arr.keys())).slice(0, 3).map(x => arr[x]);
        this.answerIdea = this.optionsIdea[Math.floor(Math.random() * this.optionsIdea.length)];
        break;
      default:
        throw new Error('Value unknown: ' + this.stateService.getDifficulty());
    }
  }
  override getMax(): number {
    throw new Error('Method not implemented.');
  }
  override getNumberOfOptions(): number {
    throw new Error('Method not implemented.');
  }
}
