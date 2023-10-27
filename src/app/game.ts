export abstract class Game {
  options!: number[];
  answer!: number;
  numberOfOptions: number;

  constructor(numberOfOptions: number) {
    this.numberOfOptions = numberOfOptions;
    this.newGame();
  }

  newGame() {
    this.options = getOptions(7, 20, this.numberOfOptions);
    this.answer = this.options[Math.floor(Math.random() * 3)];    
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
  console.log(seed);
  const a = Array.from(Array(range).keys()).map(n => n+seed+1);
  console.log(a);
  return shuffle(a).slice(0, numberOfOptions);
}

function shuffle<T>(arr: T[]): T[] { 
  const numbers = new Uint32Array(arr.length);
  window.self.crypto.getRandomValues(numbers);
  const result = arr.map((v, i) => ({v, i: numbers[i]})); 
  return result.sort((a,b) => a.i - b.i).map(o => o.v);
}

const error = document.getElementById("error")! as HTMLAudioElement; 
const fanfare = document.getElementById("fanfare")! as HTMLAudioElement; 
