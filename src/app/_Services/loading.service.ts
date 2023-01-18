import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // Nous alons créer un Subject pour pouvoir l'écouter dans n'importe quel component
  // Ecoutons ce Service dans app.component.ts
  public isLoading: Subject<boolean> =  new Subject();

  constructor() { }

}
