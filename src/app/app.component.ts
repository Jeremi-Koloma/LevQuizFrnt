import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from './_Enum/alert-type';
import { Alert } from './_Models/alert';
import { User } from './_Models/user';
import { AccountService } from './_Services/account.service';
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
   // un object d'utilisateur
   user = new User();

   userphoto!: string;
   nombreNotification!: number;

  // Pour l'injections des dépendances, injectons le LoadingService et AlertService dans le constructeur
  constructor(
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private alertService: AlertService) {
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

    this.userphoto = this.accountService.userHost;

    this.getUserInfo(this.accountService.loggInUsername)

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

    
    // Une fonction Click pour Déconnexion
  logOut(): void {
    // on appel la fonction logOut() qui se trouve dans nore service pour déconnecter l'utilisateur
    this.accountService.logOut();
    // on le redirige vers la page de connexion
    this.router.navigateByUrl('/login');
    // On l'affiche un message
    this.alertService.showAlert(
      "Déconnecter avec succès !",
      AlertType.DANGER
    );
  }


   // Une fonctions qui va retourné les informations d'un utilisateur qui va prendre le nom de user en param
   getUserInfo(username: string): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie l'utilisateur à méthode getUserInformation dans notre serviceAccount
      this.accountService.getUserInformation(username).subscribe(
        // on retourne une reponse de type User
        (response: User) => {
          // on affecte cet reponse à notre variable user qui represente l'utilisateur
          this.user = response;
          // comptons le nombre de notification de l'utilisateur
          this.nombreNotification = this.user.notificationsList.length;
          console.log(this.user)
          console.log(this.nombreNotification)
        },
        error => {
          // si ya erreur on affiche l'erreur dans la console
          console.log(error);
          // on appel la fonction logOut() pour déconnecter l'utilisateur
          this.logOut();
          // et on le redirige vers la page de connexion
          this.router.navigateByUrl('/login');
        }
      ));
  }




  
  // Dans cette Interface, on désinscrit la subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
