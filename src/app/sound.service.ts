import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  playError() { 
    error.play(); 
  }
  playFanfare() { 
    fanfare.play(); 
  }
}

const error = document.getElementById("error")! as HTMLAudioElement; 
const fanfare = document.getElementById("fanfare")! as HTMLAudioElement; 
