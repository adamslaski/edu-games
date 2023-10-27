import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line',
  template: `  
    <svg:circle svg:cx="50" [attr.cy]="cy" r="6" stroke="green" stroke-width="1" fill="yellow" />
  `
})
export class LineComponent {
  @Input({ required: true }) n!: number;
  @Input({ required: true }) cy!: number;
  space = Math.round(100 / this.n);
}
