import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Alert } from '../_Models/alert'; // Notre classe Alert dans le model

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // Créeons une variable qu'on peut envoyé partout
  public alerts : Subject<Alert> = new Subject();

  constructor(private toastController : ToastController) { }

  // une fonction qu'on poura appélé pour envoyer une alerte dans l'application
  
  async showAlert(msg:string,type:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color:type
    });
    toast.present();
  }


}
