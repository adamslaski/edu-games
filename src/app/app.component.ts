import { Component, Renderer2, ViewChild } from '@angular/core';
import { Difficulty, StateService } from './state.service';
import { MatIconAnchor } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

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
          <a mat-list-item routerLinkActive="link-active" routerLink="/sum">Dodawanie</a>
        </mat-nav-list>
        <hr/>
        <div style="display: grid; row-gap: 10px;">
          <mat-button-toggle-group (change)="stateService.setDifficulty($event.value)" [value]="currentDifficulty">
            <mat-button-toggle value="Easy">Łatwe</mat-button-toggle>
            <mat-button-toggle value="Hard">Trudne</mat-button-toggle>
          </mat-button-toggle-group> 
          <button mat-raised-button (click)="openDialog()">Informacje o grach</button>
        </div>
      </mat-sidenav>
  
      <mat-sidenav-content><router-outlet></router-outlet></mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('hamburger') hamburger?: MatIconAnchor; 
  currentDifficulty!: Difficulty;
  constructor(public stateService: StateService, private renderer: Renderer2, public dialog: MatDialog) {
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
  openDialog(): void {
    console.log('open');
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);
    console.log(dialogRef);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Informacje o grach</h1>
    <div mat-dialog-content>
      <p>Te gry edukacyjne stworzyłem dla mojej córki Łucji, aby pomóc jej w nauce liczenia i czytania. 
        Zapraszamy wszystkie dzieci do wspólnej zabawy!</p>
      <p>Projekt dostępny jest na wolnej licencji EPL 2.0, 
        źródła dostępne są <a href="https://github.com/adamslaski/numbers-game">tutaj</a>.</p>
      <p>Rysunki pobrałem z darmowego serwisu <a href="https://pixabay.com/">Pixabay</a>. 
        Serdeczne podziękowania dla wszystkich kontrybutorów Pixabay.</p>

      <p>Copyright © 2023 by Adam Slaski</p>
    </div>
    
  `,
  standalone: true,
  imports: [MatDialogModule],
})
export class DialogOverviewExampleDialog {}