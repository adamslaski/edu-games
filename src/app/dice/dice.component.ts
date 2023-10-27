import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  template: `
  <svg [attr.width]="size" [attr.height]="size">
    <svg:circle 
      *ngFor="let point of getCoordinates()" 
      [attr.cx]="point.x" [attr.cy]="point.y" [attr.r]="getR()" stroke="green" stroke-width="1" fill="yellow" />
  </svg>
  `,
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  @Input({ required: true }) numbers!: number[];
  @Input() size = 100;
  
  getR(): number {
    return Math.round(this.size * 0.06);
  }

  getCoordinates(): {x: number, y:number}[] {
    const xs = this.distribute(this.numbers.length, this.size);
    return this.pair(xs, this.numbers).flatMap(([x, n]: [number, number]) => 
      this.distribute(n, this.size).map(y => ({x, y})));
  }

  private combine(xs: number[], ys: number[]): {x: number, y:number}[] {
    return xs.flatMap(x => ys.map(y => ({ x: x, y: y})));
  }

  private pair(xs: number[], ys: number[]): [number, number][] {
    const result = [];
    for (let index = 0; index < xs.length && index < ys.length; index++) {
      result.push([xs[index], ys[index]] as [number, number]);
    }
    return result;
  }

  private distribute(n: number, range: number): number[] {
    const space = range / (n+1);
    const result = [];
    for (let i = 1; i <= n; i++) {
      result.push(Math.round(space * i));
    }
    return result;
  }
}
