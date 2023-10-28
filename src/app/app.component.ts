import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a class="button" routerLinkActive="activebutton" routerLink="/game1">Liczby</a> |
      <a class="button" routerLinkActive="activebutton" routerLink="/game2">Kropki</a>
    </nav>
    <router-outlet></router-outlet>
    `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}
