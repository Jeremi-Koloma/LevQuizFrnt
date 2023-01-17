import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertType } from '../_Enum/alert-type'; // Notre classe AlertType dans le model
import { Alert } from '../_Models/alert'; // Notre classe Alert dans le model

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // Créeons une variable qu'on peut envoyé partout
  public alerts : Subject<Alert> = new Subject();

  constructor() { }

  // une fonction qu'on poura appélé pour envoyer une alerte dans l'application
  showAlert(message: string, alterType: AlertType): void {
    // créons une variable qui va prendre les deux variable
    const alert = new Alert(message, alterType);
    this.alerts.next(alert);
  }


}
