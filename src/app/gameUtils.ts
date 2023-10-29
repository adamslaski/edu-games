export type Riddle<T> = {
  options: T[];
  answer: T;
}

export class GameUtils {
  randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
  getRandomValues(length: number): Uint32Array {
    return window.self.crypto.getRandomValues(new Uint32Array(length));
  }
  getRiddle<T>(arr: T[], numberOfOptions: number): Riddle<T> {
    if (arr.length < numberOfOptions) {
      throw new Error("not enough elements in array " + arr 
        + " to create a riddle with " + numberOfOptions + " options.");
    }
  
    const options = this.shuffle(arr).slice(0, numberOfOptions);
    const answer = this.pickOne(options);
  
    return {options, answer};
  }
  getNumberRiddle(max: number, numberOfOptions: number): Riddle<number> {
    return this.getNumberRiddleInRange(max, max, numberOfOptions);
  }
  getNumberRiddleInRange(max: number, range: number, numberOfOptions: number): Riddle<number> {
    if (max < range) {
      throw new Error("max must not be less than range");
    }
    if (numberOfOptions > range) {
      throw new Error("numberOfOptions must not be less or equal to range");
    }
    
    const start = this.randomInt(max - range) + 1;
    const arr = Array.from(Array(range).keys()).map(e => e + start);
    const options = this.shuffle(arr).slice(0, numberOfOptions);
    const answer = this.pickOne(options);
  
    return {options, answer};
  }
  pickOne<T>(arr: T[]): T {
    if (!arr || arr.length === 0) {
      throw new Error("array can't be null or empty");
      
    }
    return arr[Math.floor(this.randomInt(arr.length))];
  }
  
  shuffle<T>(arr: T[]): T[] { 
    const numbers =this.getRandomValues(arr.length);
    const result = arr.map((v, i) => ({v, i: numbers[i]})); 
    return result.sort((a,b) => a.i - b.i).map(o => o.v);
  }
}

export const gameUtils = new GameUtils();
