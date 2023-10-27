import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="correctAnswer">
      <app-dice [n]="x" [size]=200></app-dice>
    </div>
    <div class="excersizeContainer">
      <ng-container *ngFor="let option of options">
        <ng-container  *ngIf="option === x; then thenBlock else elseBlock"/>
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
export class AppComponent {
  title = 'cyferki';
  options!: number[];
  x!: number;

  constructor() {
    this.newGame();
  }

  newGameOld() {
    this.options = shuffle(Array.from(Array(10).keys())).map(n => n+1).slice(0, 3);
    this.x = this.options[Math.floor(Math.random() * 3)];    
  }

  newGame() {
    const r = 7;
    const max = 21;
    const seed = Math.floor(Math.random() * (max-r));
    console.log(seed);
    const a = Array.from(Array(r).keys()).map(n => n+seed+1);
    console.log(a);
    this.options = shuffle(a).slice(0, 3);
    this.x = this.options[Math.floor(Math.random() * 3)];    
  }

  playError() { 
    error.play(); 
  }
  playFanfare() { 
    fanfare.play(); 
    this.newGame();
  }
}

function shuffle<T>(arr: T[]): T[] { 
  const numbers = new Uint32Array(arr.length);
  window.self.crypto.getRandomValues(numbers);
  const result = arr.map((v, i) => ({v, i: numbers[i]})); 
  return result.sort((a,b) => a.i - b.i).map(o => o.v);
}

const error = document.getElementById("error")! as HTMLAudioElement; 
const fanfare = document.getElementById("fanfare")! as HTMLAudioElement; 
