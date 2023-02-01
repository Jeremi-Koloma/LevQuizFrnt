import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // Nous alons créer un Subject pour pouvoir l'écouter dans n'importe quel component
  // Ecoutons ce Service dans app.component.ts
  public isLoading: Subject<boolean> =  new Subject();

  constructor(private loadingController : LoadingController) { }

  //loading controlleur utilise pour montrer à l'user que le programme est en cours de chargement
 async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Patienter...',
     duration: 2000
  });
  await loading.present();

  // const { role, data } = await loading.onDidDismiss();
  // console.log('Loading dismissed!');
}

async dismissLoading() {
  await this.loadingController.dismiss();
}

}
