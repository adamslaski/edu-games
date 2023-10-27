import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  template: `
  <svg width="100" height="100">
    <svg:circle 
      *ngFor="let point of getCoordinates()" 
      [attr.cx]="point.x" [attr.cy]="point.y" r="6" stroke="green" stroke-width="1" fill="yellow" />
  </svg>
  `,
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  @Input({ required: true }) numbers!: number[];

  constructor() {
    console.log(this.numbers);
  }

  getCoordinates(): {x: number, y:number}[] {
    const xs = distribute(this.numbers.length, 100);
    return pair(xs, this.numbers).flatMap(([x, n]: [number, number]) => 
      distribute(n, 100).map(y => ({x, y})));
  }
}

function combine(xs: number[], ys: number[]): {x: number, y:number}[] {
  return xs.flatMap(x => ys.map(y => ({ x: x, y: y})));
}

function pair(xs: number[], ys: number[]): [number, number][] {
  const result = [];
  for (let index = 0; index < xs.length && index < ys.length; index++) {
    result.push([xs[index], ys[index]] as [number, number]);
  }
  return result;
}

function distribute(n: number, range: number): number[] {
  const space = range / (n+1);
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(Math.round(space * i));
  }
  return result;
}