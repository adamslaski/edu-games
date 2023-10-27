import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  template: `
  <svg width="100" height="100" title="4">
    <circle cx="25" cy="25" r="6" stroke="green" stroke-width="1" fill="yellow" />
    <circle cx="75" cy="25" r="6" stroke="green" stroke-width="1" fill="yellow" />
    <circle cx="25" cy="75" r="6" stroke="green" stroke-width="1" fill="yellow" />
    <circle cx="75" cy="75" r="6" stroke="green" stroke-width="1" fill="yellow" />
  </svg>
  `,
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {

}
