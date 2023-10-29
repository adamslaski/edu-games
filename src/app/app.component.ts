import { Component, Renderer2, ViewChild } from '@angular/core';
import { Difficulty, StateService } from './state.service';
import { MatIconAnchor } from '@angular/material/button';

@Component({
  selector: 'app-root',
  template: `
    <a #hamburger mat-icon-button (click)="snav.toggle()" 
      style="margin: 10px 10px 10px 0; transform: scale(1.5); z-index: 1000; position: absolute">
      <mat-icon>menu</mat-icon>
    </a>
    <mat-sidenav-container style="height: 100%;" [hasBackdrop]="true">
      <mat-sidenav [mode]="'over'" #snav style="background-color: #fafafa;" (openedChange)="toggleHamburger($event)">  
        <mat-nav-list>
          <a mat-list-item routerLinkActive="link-active" routerLink="/game1">Liczby</a>
          <a mat-list-item routerLinkActive="link-active" routerLink="/game2">Kropki</a>
          <a mat-list-item routerLinkActive="link-active" routerLink="/reading">Czytanie</a>
        </mat-nav-list>
        <hr/>
        <mat-button-toggle-group (change)="stateService.setDifficulty($event.value)" [value]="currentDifficulty">
          <mat-button-toggle value="Easy">Łatwe</mat-button-toggle>
          <mat-button-toggle value="Hard">Trudne</mat-button-toggle>
        </mat-button-toggle-group>
      </mat-sidenav>
  
      <mat-sidenav-content><router-outlet></router-outlet></mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('hamburger') hamburger?: MatIconAnchor; 
  currentDifficulty!: Difficulty;
  constructor(public stateService: StateService, private renderer: Renderer2) {
    stateService.getDifficulty().subscribe(difficculty => {
      this.currentDifficulty = difficculty;
    });
  }
  toggleHamburger(opened: boolean) {
    if (this.hamburger) {
      const native = this.hamburger?._elementRef.nativeElement;
      this.renderer.setStyle(native, 'display', opened ? 'none' : 'block');
    }
    
  }
}
