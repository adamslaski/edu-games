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
  @Input({ required: true }) n!: number;
  @Input() size = 100;
  
  getR(): number {
    return Math.round(this.size * 0.06);
  }

  private getNumbers(): number[] {
    switch (this.n) {
      case 0: return [];
      case 1: return [1];
      case 2: return [2];
      case 3: return [3];
      case 4: return [2, 2];
      case 5: return [2, 1, 2];
      case 6: return [3, 3];
      case 7: return [2, 3, 2];
      case 8: return [3, 2, 3];
      case 9: return [3, 3, 3];
      case 10: return [3, 4, 3];
      case 11: return [4, 3, 4];
      case 12: return [4, 4, 4];
      case 13: return [4, 5, 4];
      case 14: return [5, 4, 5];
      case 15: return [5, 5, 5];
      case 16: return [4, 4, 4, 4];
      case 17: return [3, 4, 3, 4, 3];
      case 18: return [4, 3, 4, 3, 4];
      case 19: return [4, 4, 3, 4, 4];
      case 20: return [4, 4, 4, 4, 4];
      case 21: return [4, 4, 5, 4, 4];
      case 22: return [4, 5, 4, 5, 4];
      case 23: return [5, 4, 5, 4, 5];
      case 24: return [5, 5, 4, 5, 5];
      case 25: return [5, 5, 5, 5, 5];
      default: throw new Error("Can't display more than 25");
    }
  }

  getCoordinates(): {x: number, y:number}[] {
    const xs = this.distribute(this.getNumbers().length, this.size);
    return this.pair(xs, this.getNumbers()).flatMap(([x, n]: [number, number]) => 
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
