export abstract class Game {
  options!: number[];
  answer!: number;

  abstract getMax(): number;
  abstract getNumberOfOptions(): number;

  newGame() {
    this.options = getOptions(7, this.getMax(), this.getNumberOfOptions());
    this.answer = this.options[Math.floor(Math.random() * this.options.length)];    
  }

  playError() { 
    error.play(); 
  }
  playFanfare() { 
    fanfare.play(); 
    this.newGame();
  }
}

function getOptions(range: number, max: number, numberOfOptions: number) {
  const seed = Math.floor(Math.random() * (max+1-range));
  const a = Array.from(Array(range).keys()).map(n => n+seed+1);
  return shuffle(a).slice(0, numberOfOptions);
}

export function shuffle<T>(arr: T[]): T[] { 
  const numbers = new Uint32Array(arr.length);
  window.self.crypto.getRandomValues(numbers);
  const result = arr.map((v, i) => ({v, i: numbers[i]})); 
  return result.sort((a,b) => a.i - b.i).map(o => o.v);
}

const error = document.getElementById("error")! as HTMLAudioElement; 
const fanfare = document.getElementById("fanfare")! as HTMLAudioElement; 
