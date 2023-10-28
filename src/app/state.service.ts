import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private difficulty: Difficulty = 'Easy';
  constructor() { }

  getDifficulty(): Difficulty {
    return this.difficulty;
  }

  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }
}

export type Difficulty = 'Easy' | 'Hard';