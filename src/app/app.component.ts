import { Component, inject } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a class="button" routerLinkActive="activebutton" routerLink="/game1">Liczby</a> |
      <a class="button" routerLinkActive="activebutton" routerLink="/game2">Kropki</a>

      <a class="button" 
        (click)="stateService.setDifficulty('Easy')" 
        [class.activebutton]="stateService.getDifficulty() === 'Easy'"
        >Łatwe</a> |
      <a class="button" 
        (click)="stateService.setDifficulty('Hard')" 
        [class.activebutton]="stateService.getDifficulty() === 'Hard'"
        >Trudne</a>
    </nav>
    <router-outlet></router-outlet>
    `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  stateService: StateService = inject(StateService);
}
