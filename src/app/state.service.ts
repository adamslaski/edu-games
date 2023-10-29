import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private $difficulty = new BehaviorSubject<Difficulty>('Easy');
  constructor() { }

  getDifficulty(): Observable<Difficulty> {
    return this.$difficulty.asObservable();
  }

  setDifficulty(difficulty: Difficulty) {
    this.$difficulty.next(difficulty);
  }
}

export type Difficulty = 'Easy' | 'Hard';