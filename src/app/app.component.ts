import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from './_Models/alert';
import { AlertService } from './_Services/alert.service'; // importation de notre ServiceAlert
import { LoadingService } from './_Services/loading.service'; // importation de notre LoadingService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

// implementons interface OnInit puis OnDestroy 
export class AppComponent implements OnInit, OnDestroy{

  // Déclarons des variables
  // une variable liste de subscriptions pour souscrire les observables
  private subscriptions: Subscription[] = [];
  // une variable liste pour les alertes notre Model
  public alerts: Alert[] = [];
  // une variable pour notre service Loadind
  public loading: boolean;

  // Pour l'injections des dépendances, injectons le LoadingService et AlertService dans le constructeur
  constructor(private loadingService: LoadingService, private alertService: AlertService) {
    this.loading = false;
  }


  ngOnInit() {
    // Ajoutons loadingService dans la liste de subscription
    this.subscriptions.push(
      //  Ecouteons l'observable qui est dans loadingService
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    // pour alert aussi ajoutons une autre subscriptions dans la liste
    this.subscriptions.push(
      //ecoutons les alertes
      this.alertService.alerts.subscribe(alert => {
        // ajoutons cette alerte dans la liste des alertes
        this.alerts.push(alert);
        // Appelons la function qui va fermer les alerts automatiquement dans (3second)
        this.closeAlert(3);
      })
    );

  }

    // Une fonctions pour fermer les alertes automatiquements
    private closeAlert(second: number): void {
      // setTimeout, pour attendre un nombre de séconde avant que le code s'exécute
      setTimeout(() => {
        const element: HTMLElement = document.getElementById('dismissAlert') as HTMLElement;
        // Ajoutons évenement click à notre variable alerte recupéré
        element.click;
      }, second * 1000);
    }

  
  // Dans cette Interface, on désinscrit la subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
