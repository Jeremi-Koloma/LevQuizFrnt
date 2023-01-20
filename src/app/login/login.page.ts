import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../_Services/account.service';
import { LoadingService } from '../_Services/loading.service';
import { AlertType } from '../_Enum/alert-type';
import { AlertService } from '../_Services/alert.service';
import { User } from '../_Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {


  
  Registers:String = 'Register'

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

  // Injections des dépendances
  constructor(
    private router: Router, // pour la redirection
    private accountService: AccountService, 
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
     /* ***********************
     Quand ce composant est initialiser,
      Une fois que la connexion à reussi
      nous ne voulons pas qu'il reste sur la même page, on veut l'envoyé vers la page qu'il démande ou l'Accueil
     ************************* */

      // Vérifions si l'utilisateur s'est authentifier
      if (this.accountService.isLoggedIn()) {
        // on le laisse aller là ou il veut
        if (this.accountService.redirectUrl) {
          this.router.navigateByUrl(this.accountService.redirectUrl);
        } else { // sinon il s'est authentifier mais l'url n'existe pas, on le redirige à la page d'Accueil
          this.router.navigateByUrl('/home');
        }
      }
      // Sinon si la connexion n'a pas réussi, on le redirige vers la page de connexion
       else {
        this.router.navigateByUrl('/login');
      }

  }


  /* ***********************
      Une fonction pour le Login
      Qui va prendre un user son username and password
  ************************* */
 // Quand on appel cette fonction onLogin
   onLogin(user: User): void {
    // on appel le service loadingService le chargement de la page
    this.loadingService.isLoading.next(true);
    // Affichons les informations de l'utilisateur dans la console
    console.log(user);
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie les identifiants de l'utilisateur à méthode login dans notre serviceAccount
      this.accountService.login(user).subscribe(
        // On prend la reponse dans le body
        response => {
          // on déclare une constante pour acceder à la response, puis le header pour recupérer le token
          const token : any = response.headers.get('Authorization');
          // on appel la méthode saveToken dans le serviceAccount pour enregister le token dans app front
          this.accountService.saveToken(token);
          // On vérifie s'il a un bon url de la page qu'il veut acceder et que l'authentification a réussi
          if (this.accountService.redirectUrl) {
            // on le redirige vers la page demande si elle existe
            this.router.navigateByUrl(this.accountService.redirectUrl);
          } 
          // Sinon on le redirige vers la page d'Accueil si l'authentification a réussi
          else {
            this.router.navigateByUrl('/home');
          }
          this.loadingService.isLoading.next(false);
        },
        error => {
          // sinon s'il ya erreur, on l'affiche dans la console
          console.log(error);
          this.loadingService.isLoading.next(false);
          // on appel la fonction de message
          this.alertService.showAlert(
            "Nom d'utilisateur ou le mots de passe est incorrect !",
            AlertType.DANGER
          );
        }
      )
    );
  }


  // On le Désinscrit
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }





  // Segment
 




}
